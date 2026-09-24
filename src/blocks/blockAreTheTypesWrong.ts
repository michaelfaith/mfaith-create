import { base } from '../base.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';

export const blockAreTheTypesWrong = base.createBlock({
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
