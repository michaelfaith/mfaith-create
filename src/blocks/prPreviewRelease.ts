import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import type { BlockWithProps } from './Block.ts';
import { githubApps } from './githubApps.ts';
import { packageJson } from './packageJson.ts';
import { createSingleJobWorkflow } from './workflows/createSingleJobWorkflow.ts';
import { type Builder, builderSchema } from './workflows/schema.ts';

export interface PrPreviewReleaseProps {
  builders?: Builder[];
}

export const prPreviewRelease: BlockWithProps<PrPreviewReleaseProps> = base.createBlock({
  about: {
    name: 'PR Preview Release',
    description:
      'Creates a workflow using pkg-pr-new to publish preview versions of packages at PR-time.',
  },
  props: {
    builders: z.array(builderSchema).default([]),
  },
  produce({ props }) {
    const { builders } = props;

    return {
      extensions: [
        githubApps({
          apps: [
            {
              name: 'pkg-pr-new',
              url: 'https://github.com/apps/pkg-pr-new',
            },
          ],
        }),
        packageJson({
          properties: {
            devDependencies: getPackageDependencies('pkg-pr-new'),
          },
        }),
      ],
      files: {
        '.github': {
          workflows: {
            'publish-preview.yml': createSingleJobWorkflow({
              name: 'Publish Preview',
              on: {
                pull_request: null,
                push: {
                  branches: ['main'],
                },
              },
              job: {
                id: 'publish',
                name: 'Publish Preview Package',
                if: 'github.event.repository.fork != true',
                steps: [
                  { uses: '$/.github/actions/setup' },
                  ...builders
                    .sort((a, b) => a.order - b.order)
                    .map(({ run }) => ({ name: 'Build', run })),
                  {
                    name: 'Publish',
                    run: 'pnpm pkg-pr-new publish --pnpm --packageManager=pnpm --commentWithDev --commentWithSha',
                  },
                ],
              },
            }),
          },
        },
      },
    };
  },
});
