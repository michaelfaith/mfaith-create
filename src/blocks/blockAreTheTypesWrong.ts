import { base } from '../base.ts';
import { blockGitHubActionsCI } from './blockGitHubActionsCI.ts';

export const blockAreTheTypesWrong = base.createBlock({
  about: {
    name: 'Are the Types Wrong',
  },
  produce() {
    return {
      addons: [
        blockGitHubActionsCI({
          jobs: [
            {
              name: 'Are the Types Wrong?',
              steps: [
                { run: 'pnpm build' },
                {
                  run: 'npx --yes @arethetypeswrong/cli --pack . --ignore-rules cjs-resolves-to-esm --profile esm-only',
                },
              ],
            },
          ],
        }),
      ],
    };
  },
});
