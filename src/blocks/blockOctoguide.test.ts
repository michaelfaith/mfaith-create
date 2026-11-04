import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockOctoguide } from './blockOctoguide.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockOctoguide, () => {
  test('production', () => {
    const creation = testBlock(blockOctoguide, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "workflows": {
              "octoguide.yml": "name: OctoGuide

      on:
        pull_request_target:
          types:
            - edited
            - opened

      jobs:
        octoguide:
          if: \${{ !endsWith(github.actor, '[bot]') && !contains(github.event.pull_request.labels.*.name, 'autorelease') }}
          runs-on: ubuntu-latest
          permissions:
            pull-requests: write
          steps:
            - uses: octoguide/bot@0.32.0
              with:
                github-token: \${{ secrets.GITHUB_TOKEN }}
                rules: |-
                  {
                    "pr-title-conventional": true
                  }
      ",
            },
          },
        },
      }
    `);
  });

  test('transition mode without files', () => {
    const creation = testBlock(blockOctoguide, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Remove Files]",
            "props": {
              "files": [
                ".github/workflows/accessibility-alt-text-bot.{yaml,yml}",
                ".github/workflows/compliance.{yaml,yml}",
                ".github/workflows/octoguide.yml",
              ],
            },
          },
        ],
        "files": {
          ".github": {
            "workflows": {
              "octoguide.yml": "name: OctoGuide

      on:
        pull_request_target:
          types:
            - edited
            - opened

      jobs:
        octoguide:
          if: \${{ !endsWith(github.actor, '[bot]') && !contains(github.event.pull_request.labels.*.name, 'autorelease') }}
          runs-on: ubuntu-latest
          permissions:
            pull-requests: write
          steps:
            - uses: octoguide/bot@0.32.0
              with:
                github-token: \${{ secrets.GITHUB_TOKEN }}
                rules: |-
                  {
                    "pr-title-conventional": true
                  }
      ",
            },
          },
        },
      }
    `);
  });
});
