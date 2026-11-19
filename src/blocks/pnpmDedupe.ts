import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { githubActionsCi } from './githubActionsCi.ts';
import { packageJson } from './packageJson.ts';
import { blockRemoveWorkflows } from './removeWorkflows.ts';

export const pnpmDedupe: BlockWithoutProps = base.createBlock({
  about: {
    name: 'pnpm Dedupe',
  },
  produce() {
    return {
      extensions: [
        githubActionsCi({
          jobs: [
            {
              name: 'Dedupe Check',
              steps: [{ run: 'pnpm dedupe --check' }],
            },
          ],
        }),
        packageJson({
          cleanupCommands: ['pnpm dedupe --prefer-offline'],
        }),
      ],
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveWorkflows({
          workflows: ['lint-packages'],
        }),
      ],
    };
  },
});
