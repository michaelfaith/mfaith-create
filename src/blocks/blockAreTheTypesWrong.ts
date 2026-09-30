import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';

export const blockAreTheTypesWrong: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Are the Types Wrong',
  },
  produce({ options }) {
    const packName = `${options.repository}.tgz`;
    return {
      addons: [
        blockGithubActionsCi({
          jobs: [
            {
              name: 'Are the Types Wrong?',
              steps: [
                { run: 'pnpm build' },
                { run: `pnpm pack --out ${packName}` },
                {
                  run: `pnpx @arethetypeswrong/cli ${packName} --profile esm-only`,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
});
