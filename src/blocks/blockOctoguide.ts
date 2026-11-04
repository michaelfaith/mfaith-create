import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { createSingleJobWorkflow } from './workflows/createSingleJobWorkflow.ts';
import { resolveUses } from './workflows/resolveUses.ts';

export const blockOctoguide: BlockWithoutProps = base.createBlock({
  about: {
    name: 'OctoGuide',
  },
  produce({ options }) {
    return {
      files: {
        '.github': {
          workflows: {
            'octoguide.yml': createSingleJobWorkflow({
              name: 'OctoGuide',
              on: {
                pull_request_target: {
                  types: ['edited', 'opened'],
                },
              },
              job: {
                if: "${{ !endsWith(github.actor, '[bot]') && !contains(github.event.pull_request.labels.*.name, 'autorelease') }}",
                permissions: {
                  'pull-requests': 'write',
                },
                steps: [
                  {
                    uses: resolveUses('octoguide/bot', '0.32.0', options.workflowsVersions),
                    with: {
                      'github-token': '${{ secrets.GITHUB_TOKEN }}',
                      // https://github.com/octoguide/bot/issues/624
                      rules: `{
  "pr-title-conventional": true
}`,
                    },
                  },
                ],
              },
            }),
          },
        },
      },
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveFiles({
          files: [
            '.github/workflows/accessibility-alt-text-bot.{yaml,yml}',
            '.github/workflows/compliance.{yaml,yml}',
            '.github/workflows/octoguide.yml',
          ],
        }),
      ],
    };
  },
});
