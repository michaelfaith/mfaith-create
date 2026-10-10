import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';

export const blockPnpmDedupe: BlockWithoutProps = base.createBlock({
  about: {
    name: 'pnpm Dedupe',
  },
  produce() {
    return {
      extensions: [
        blockGithubActionsCi({
          jobs: [
            {
              name: 'Dedupe Check',
              steps: [{ run: 'pnpm dedupe --check' }],
            },
          ],
        }),
        blockPackageJson({
          cleanupCommands: ['pnpm dedupe'],
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
