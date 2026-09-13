import { testBlock, testIntake } from 'bingo-stratum-testers';
import { dump } from 'js-yaml';
import { describe, expect, it, test } from 'vitest';

import { blockGitHubActionsCI } from './blockGitHubActionsCI.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockGitHubActionsCI, () => {
  test('production', () => {
    const creation = testBlock(blockGitHubActionsCI, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "requiredStatusChecks": undefined,
            },
            "block": [Function],
          },
        ],
        "files": {
          ".github": {
            "actions": {
              "setup": {
                "action.yaml": "name: Setup

      description: Sets up the repo for a typical CI job

      inputs:
        cache:
          description: Cache the pnpm store
          default: true
          required: false
        install-flags:
          description: Flags to pass to \`pnpm install\`
          required: false
          type: string
        node-version:
          description: Node.js version to use
          default: '20'
          required: false
        skip-checkout:
          description: Skip the checkout step if the repo is already checked out
          default: false
          required: false
        strict-engines:
          description: Enable \`engineStrict\` on \`pnpm install\`
          default: false
          required: false

      runs:
        steps:
          - uses: actions/checkout@v7
            if: \${{ inputs.skip-checkout == 'false' }}
          - uses: pnpm/setup@v2
            env:
              pnpm_config_engine_strict: \${{ inputs.strict-engines && 'true' || '' }}
            with:
              cache: \${{ inputs.cache }}
              install: \${{ inputs.install-flags == '' }}
              runtime: node@\${{ inputs.node-version }}
          - run: pnpm install \${{ inputs.install-flags }}
            if: \${{ inputs.install-flags != '' }}
            env:
              pnpm_config_engine_strict: \${{ inputs.strict-engines && 'true' || '' }}
            shell: bash
        using: composite
      ",
              },
            },
            "workflows": {
              "ci.yaml": undefined,
              "pr-review-requested.yaml": "name: PR Review Requested

      on:
        pull_request_target:
          types:
            - review_requested

      jobs:
        pr_review_requested:
          runs-on: ubuntu-latest
          permissions:
            pull-requests: write
          steps:
            - uses: actions-ecosystem/action-remove-labels@v1
              with:
                labels: 'status: waiting for author'
            - if: failure()
              run: |
                echo "Don't worry if the previous step failed."
                echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."
      ",
            },
          },
        },
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockGitHubActionsCI, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "requiredStatusChecks": undefined,
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": [
                ".circleci",
                ".github/actions/setup/action.yml",
                ".github/workflows/ci.yml",
                ".github/workflows/pr-review-requested.yml",
                "travis.{yaml,yml}",
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          ".github": {
            "actions": {
              "setup": {
                "action.yaml": "name: Setup

      description: Sets up the repo for a typical CI job

      inputs:
        cache:
          description: Cache the pnpm store
          default: true
          required: false
        install-flags:
          description: Flags to pass to \`pnpm install\`
          required: false
          type: string
        node-version:
          description: Node.js version to use
          default: '20'
          required: false
        skip-checkout:
          description: Skip the checkout step if the repo is already checked out
          default: false
          required: false
        strict-engines:
          description: Enable \`engineStrict\` on \`pnpm install\`
          default: false
          required: false

      runs:
        steps:
          - uses: actions/checkout@v7
            if: \${{ inputs.skip-checkout == 'false' }}
          - uses: pnpm/setup@v2
            env:
              pnpm_config_engine_strict: \${{ inputs.strict-engines && 'true' || '' }}
            with:
              cache: \${{ inputs.cache }}
              install: \${{ inputs.install-flags == '' }}
              runtime: node@\${{ inputs.node-version }}
          - run: pnpm install \${{ inputs.install-flags }}
            if: \${{ inputs.install-flags != '' }}
            env:
              pnpm_config_engine_strict: \${{ inputs.strict-engines && 'true' || '' }}
            shell: bash
        using: composite
      ",
              },
            },
            "workflows": {
              "ci.yaml": undefined,
              "pr-review-requested.yaml": "name: PR Review Requested

      on:
        pull_request_target:
          types:
            - review_requested

      jobs:
        pr_review_requested:
          runs-on: ubuntu-latest
          permissions:
            pull-requests: write
          steps:
            - uses: actions-ecosystem/action-remove-labels@v1
              with:
                labels: 'status: waiting for author'
            - if: failure()
              run: |
                echo "Don't worry if the previous step failed."
                echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."
      ",
            },
          },
        },
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockGitHubActionsCI, {
      addons: {
        jobs: [
          {
            name: 'Validate',
            steps: [
              {
                env: { VAR_ENV: 'true' },
                if: 'always()',
                run: 'pnpm validate',
                with: { VAR_WITH: 'true' },
              },
            ],
          },
        ],
        nodeVersion: 24,
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "requiredStatusChecks": [
                "Engines Check",
                "Validate",
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          ".github": {
            "actions": {
              "setup": {
                "action.yaml": "name: Setup

      description: Sets up the repo for a typical CI job

      inputs:
        cache:
          description: Cache the pnpm store
          default: true
          required: false
        install-flags:
          description: Flags to pass to \`pnpm install\`
          required: false
          type: string
        node-version:
          description: Node.js version to use
          default: '24'
          required: false
        skip-checkout:
          description: Skip the checkout step if the repo is already checked out
          default: false
          required: false
        strict-engines:
          description: Enable \`engineStrict\` on \`pnpm install\`
          default: false
          required: false

      runs:
        steps:
          - uses: actions/checkout@v7
            if: \${{ inputs.skip-checkout == 'false' }}
          - uses: pnpm/setup@v2
            env:
              pnpm_config_engine_strict: \${{ inputs.strict-engines && 'true' || '' }}
            with:
              cache: \${{ inputs.cache }}
              install: \${{ inputs.install-flags == '' }}
              runtime: node@\${{ inputs.node-version }}
          - run: pnpm install \${{ inputs.install-flags }}
            if: \${{ inputs.install-flags != '' }}
            env:
              pnpm_config_engine_strict: \${{ inputs.strict-engines && 'true' || '' }}
            shell: bash
        using: composite
      ",
              },
            },
            "workflows": {
              "ci.yaml": "name: CI

      on:
        pull_request: ~
        push:
          branches:
            - main

      jobs:
        engines_check:
          name: Engines Check
          runs-on: ubuntu-latest
          steps:
            - uses: $/.github/actions/setup
              with:
                cache: false
                install-flags: --prod --ignore-scripts
                strict-engines: true

        validate:
          name: Validate
          runs-on: ubuntu-latest
          steps:
            - uses: $/.github/actions/setup
            - run: pnpm validate
              env:
                VAR_ENV: 'true'
              if: always()
              with:
                VAR_WITH: 'true'
      ",
              "pr-review-requested.yaml": "name: PR Review Requested

      on:
        pull_request_target:
          types:
            - review_requested

      jobs:
        pr_review_requested:
          runs-on: ubuntu-latest
          permissions:
            pull-requests: write
          steps:
            - uses: actions-ecosystem/action-remove-labels@v1
              with:
                labels: 'status: waiting for author'
            - if: failure()
              run: |
                echo "Don't worry if the previous step failed."
                echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."
      ",
            },
          },
        },
      }
    `);
  });

  describe('intake', () => {
    it('returns undefined when action.yaml does not exist', () => {
      const actual = testIntake(blockGitHubActionsCI, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when action.yaml contains invalid YAML', () => {
      const actual = testIntake(blockGitHubActionsCI, {
        files: {
          '.github': {
            actions: {
              setup: {
                'action.yaml': ['invalid YAML!'],
              },
            },
          },
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when action.yaml has no inputs', () => {
      const actual = testIntake(blockGitHubActionsCI, {
        files: {
          '.github': {
            actions: {
              setup: {
                'action.yaml': [
                  dump({
                    runs: {
                      steps: [],
                    },
                  }),
                ],
              },
            },
          },
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined env when action.yaml contains a test action with no node-version in its inputs', () => {
      const actual = testIntake(blockGitHubActionsCI, {
        files: {
          '.github': {
            actions: {
              setup: {
                'action.yaml': [
                  dump({
                    inputs: {
                      'some-other-prop': {
                        description: 'Node.js version to use',
                        default: 24,
                        required: false,
                      },
                    },
                  }),
                ],
              },
            },
          },
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns nodeVersion when action.yaml contains a test action with node-version in its inputs', () => {
      const nodeVersion = '24';

      const actual = testIntake(blockGitHubActionsCI, {
        files: {
          '.github': {
            actions: {
              setup: {
                'action.yaml': [
                  dump({
                    inputs: {
                      'node-version': {
                        description: 'Node.js version to use',
                        default: nodeVersion,
                        required: false,
                      },
                    },
                  }),
                ],
              },
            },
          },
        },
      });

      expect(actual).toEqual({ nodeVersion });
    });
  });
});
