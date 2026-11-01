import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { blockGithubApps } from './blockGithubApps.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';

const ignoreDepsSchema = z.array(z.string()).default([]);

export interface BlockRenovateProps {
  ignoreDeps?: string[];
}

export const blockRenovate: BlockWithProps<BlockRenovateProps> = base.createBlock({
  about: {
    name: 'Renovate',
  },
  props: {
    ignoreDeps: ignoreDepsSchema,
  },
  intake({ files }) {
    const raw = intakeFileAsJson(files, ['.github', 'renovate.json']);

    return {
      ignoreDeps: ignoreDepsSchema.safeParse(raw?.ignoreDeps).data,
    };
  },
  produce({ props }) {
    const { ignoreDeps } = props;

    return {
      extensions: [
        blockGithubApps({
          apps: [
            {
              name: 'Renovate',
              url: 'https://github.com/apps/renovate',
            },
          ],
        }),
      ],
      files: {
        '.github': {
          'renovate.json': JSON.stringify({
            $schema: 'https://docs.renovatebot.com/renovate-schema.json',
            automerge: true,
            extends: [':preserveSemverRanges', 'config:best-practices', 'replacements:all'],
            ignoreDeps: ignoreDeps.length ? Array.from(new Set(ignoreDeps)).sort() : undefined,
            labels: ['dependencies'],
            minimumReleaseAge: '7 days',
            postUpdateOptions: ['pnpmDedupe'],
          }),
        },
      },
    };
  },
});
