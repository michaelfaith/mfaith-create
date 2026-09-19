import { z } from 'zod';

import { base } from '../base.ts';
import { blockGitHubApps } from './blockGitHubApps.ts';
import { createSingleJobWorkflow } from './workflows/createSingleJobWorkflow.ts';

export const blockPrPreviewRelease = base.createBlock({
  about: {
    name: 'PR Preview Release',
    description:
      'Creates a workflow using pkg-pr-new to publish preview versions of packages at PR-time.',
  },
  addons: {
    builders: z
      .array(
        z.object({
          order: z.number(),
          run: z.string(),
        }),
      )
      .default([]),
  },
  produce({ addons }) {
    const { builders } = addons;

    return {
      addons: [
        blockGitHubApps({
          apps: [
            {
              name: 'pkg-pr-new',
              url: 'https://github.com/apps/pkg-pr-new',
            },
          ],
        }),
      ],
      files: {
        '.github': {
          workflows: {
            'publish-preview.yaml': createSingleJobWorkflow({
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
