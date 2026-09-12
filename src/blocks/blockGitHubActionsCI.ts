import { z } from 'zod';

import { base } from '../base.ts';
import { intakeActionInput } from './actions/inputs.ts';
import { resolveUses } from './actions/resolveUses.ts';
import { zActionStep } from './actions/steps.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRepositoryBranchRuleset } from './blockRepositoryBranchRuleset.ts';
import { createMultiJobWorkflow } from './files/createMultiJobWorkflow.ts';
import { createSingleJobWorkflow } from './files/createSingleJobWorkflow.ts';
import { formatWorkflowYaml } from './files/formatWorkflowYaml.ts';
import { zWorkflowPermissions } from './files/workflow.types.ts';

const zJob = z.object({
  if: z.string().optional(),
  name: z.string(),
  permissions: zWorkflowPermissions.optional(),
  steps: z.array(zActionStep),
});
type Job = z.infer<typeof zJob>;

const addSetupToSteps = (job: Job): Job => ({
  ...job,
  steps: [{ uses: '$/.github/actions/setup' }, ...job.steps],
});

export const blockGitHubActionsCI = base.createBlock({
  about: {
    name: 'GitHub Actions CI',
  },
  addons: {
    jobs: z.array(zJob).optional(),
    nodeVersion: z.union([z.number(), z.string()]).optional(),
  },
  intake({ files }) {
    const nodeVersionInput = intakeActionInput(
      files,
      ['.github', 'actions', 'setup', 'action.yaml'],
      'node-version',
    );
    if (!nodeVersionInput) {
      return undefined;
    }

    return { nodeVersion: String(nodeVersionInput.default) };
  },
  produce({ addons, options }) {
    const { jobs, nodeVersion = options.node.pinned ?? options.node.minimum } =
      addons;
    const jobsWithEnginesCheck =
      jobs &&
      [
        ...jobs.map(addSetupToSteps),
        {
          name: 'Engines Check',
          steps: [
            {
              uses: '$/.github/actions/setup',
              with: {
                cache: false,
                'install-flags': '--prod --ignore-scripts',
                'strict-engines': true,
              },
            },
          ],
        },
      ].toSorted((a, b) => a.name.localeCompare(b.name));

    return {
      addons: [
        blockRepositoryBranchRuleset({
          requiredStatusChecks: jobsWithEnginesCheck?.map((job) => job.name),
        }),
      ],
      files: {
        '.github': {
          actions: {
            setup: {
              'action.yaml': formatWorkflowYaml({
                name: 'Setup',
                description: 'Sets up the repo for a typical CI job',
                inputs: {
                  cache: {
                    description: 'Cache the pnpm store',
                    default: true,
                    required: false,
                  },
                  'install-flags': {
                    description: 'Flags to pass to `pnpm install`',
                    required: false,
                    type: 'string',
                  },
                  'node-version': {
                    description: 'Node.js version to use',
                    default:
                      typeof nodeVersion === 'string'
                        ? nodeVersion.split('.')[0]
                        : String(nodeVersion),
                    required: false,
                  },
                  'skip-checkout': {
                    description:
                      'Skip the checkout step if the repo is already checked out',
                    default: false,
                    required: false,
                  },
                  'strict-engines': {
                    description: 'Enable `engineStrict` on `pnpm install`',
                    default: false,
                    required: false,
                  },
                },
                runs: {
                  steps: [
                    {
                      uses: resolveUses(
                        'actions/checkout',
                        'v7',
                        options.workflowsVersions,
                      ),
                      if: "${{ inputs.skip-checkout == 'false' }}",
                    },
                    {
                      uses: resolveUses(
                        'pnpm/setup',
                        'v2',
                        options.workflowsVersions,
                      ),
                      env: {
                        pnpm_config_engine_strict:
                          "${{ inputs.strict-engines && 'true' || '' }}",
                      },
                      with: {
                        cache: '${{ inputs.cache }}',
                        install: "${{ inputs.install-flags == '' }}",
                        runtime: 'node@${{ inputs.node-version }}',
                      },
                    },
                    {
                      run: 'pnpm install ${{ inputs.install-flags }}',
                      if: "${{ inputs.install-flags != '' }}",
                      env: {
                        pnpm_config_engine_strict:
                          "${{ inputs.strict-engines && 'true' || '' }}",
                      },
                      shell: 'bash',
                    },
                  ],
                  using: 'composite',
                },
              }),
            },
          },
          workflows: {
            'ci.yaml':
              jobsWithEnginesCheck &&
              createMultiJobWorkflow({
                name: 'CI',
                on: {
                  pull_request: null,
                  push: {
                    branches: ['main'],
                  },
                },
                jobs: jobsWithEnginesCheck,
              }),
            'pr-review-requested.yaml': createSingleJobWorkflow({
              name: 'PR Review Requested',
              on: {
                pull_request_target: {
                  types: ['review_requested'],
                },
              },
              job: {
                permissions: {
                  'pull-requests': 'write',
                },
                steps: [
                  {
                    uses: resolveUses(
                      'actions-ecosystem/action-remove-labels',
                      'v1',
                      options.workflowsVersions,
                    ),
                    with: {
                      labels: 'status: waiting for author',
                    },
                  },
                  {
                    if: 'failure()',
                    run: 'echo "Don\'t worry if the previous step failed."\necho "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."\n',
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
            '.circleci',
            '.github/actions/setup/action.yml',
            '.github/workflows/ci.yml',
            '.github/workflows/pr-review-requested.yml',
            'travis.{yaml,yml}',
          ],
        }),
      ],
    };
  },
});
