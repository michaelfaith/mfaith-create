import { z } from 'zod';

import { base } from '../base.ts';
import { resolveUses } from './actions/resolveUses.ts';
import { intakeFileYamlSteps } from './actions/steps.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { createSingleJobWorkflow } from './files/createSingleJobWorkflow.ts';

export const blockOctoGuide = base.createBlock({
  about: {
    name: 'OctoGuide',
  },
  addons: {
    config: z.union([z.literal('recommended'), z.literal('strict')]).optional(),
  },
  intake({ files }) {
    const steps = intakeFileYamlSteps(
      files,
      ['.github', 'workflows', 'octoguide.yaml'],
      ['jobs', 'octoguide', 'steps'],
    );
    if (!steps) {
      return undefined;
    }

    const runOctoGuideStep = steps.find(
      (step) =>
        typeof step.uses === 'string' &&
        step.uses.startsWith('JoshuaKGoldberg/octoguide'),
    );
    if (!runOctoGuideStep) {
      return undefined;
    }

    return {
      config: runOctoGuideStep.with?.config as
        'recommended' | 'strict' | undefined,
    };
  },
  produce({ addons, options }) {
    return {
      files: {
        '.github': {
          workflows: {
            'octoguide.yaml': createSingleJobWorkflow({
              name: 'OctoGuide',
              on: {
                discussion: {
                  types: ['created', 'edited'],
                },
                discussion_comment: {
                  types: ['created', 'deleted', 'edited'],
                },
                issue_comment: {
                  types: ['created', 'deleted', 'edited'],
                },
                issues: {
                  types: ['edited', 'opened'],
                },
                pull_request_review_comment: {
                  types: ['created', 'deleted', 'edited'],
                },
                pull_request_target: {
                  types: ['edited', 'opened'],
                },
              },
              job: {
                if: "${{ !endsWith(github.actor, '[bot]') && !contains(github.event.pull_request.labels.*.name, 'autorelease') }}",
                permissions: {
                  discussions: 'write',
                  issues: 'write',
                  'pull-requests': 'write',
                },
                steps: [
                  {
                    uses: resolveUses(
                      'JoshuaKGoldberg/octoguide',
                      '0.11.1',
                      options.workflowsVersions,
                    ),
                    with: {
                      config: addons.config ?? 'recommended',
                      'github-token': '${{ secrets.GITHUB_TOKEN }}',
                      // https://github.com/octoguide/bot/issues/624
                      rules: `{
  "pr-branch-non-default": false
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
      addons: [
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
