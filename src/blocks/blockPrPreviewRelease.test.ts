import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockPrPreviewRelease } from './blockPrPreviewRelease.ts';

describe(blockPrPreviewRelease, () => {
  test('without props', () => {
    const creation = testBlock(blockPrPreviewRelease, {});

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Apps]",
            "props": {
              "apps": [
                {
                  "name": "pkg-pr-new",
                  "url": "https://github.com/apps/pkg-pr-new",
                },
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "pkg-pr-new": "0.0.88",
                },
              },
            },
          },
        ],
        "files": {
          ".github": {
            "workflows": {
              "publish-preview.yaml": "name: Publish Preview

      on:
        pull_request: ~
        push:
          branches:
            - main

      jobs:
        publish:
          name: Publish Preview Package
          if: github.event.repository.fork != true
          runs-on: ubuntu-latest
          steps:
            - uses: $/.github/actions/setup
            - name: Publish
              run: pnpm pkg-pr-new publish --pnpm --packageManager=pnpm --commentWithDev --commentWithSha
      ",
            },
          },
        },
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(blockPrPreviewRelease, {
      props: {
        builders: [
          {
            order: 1,
            run: 'one',
          },
          {
            order: 0,
            run: 'zero',
          },
          {
            order: 2,
            run: 'two',
          },
        ],
      },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Apps]",
            "props": {
              "apps": [
                {
                  "name": "pkg-pr-new",
                  "url": "https://github.com/apps/pkg-pr-new",
                },
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "pkg-pr-new": "0.0.88",
                },
              },
            },
          },
        ],
        "files": {
          ".github": {
            "workflows": {
              "publish-preview.yaml": "name: Publish Preview

      on:
        pull_request: ~
        push:
          branches:
            - main

      jobs:
        publish:
          name: Publish Preview Package
          if: github.event.repository.fork != true
          runs-on: ubuntu-latest
          steps:
            - uses: $/.github/actions/setup
            - name: Build
              run: zero
            - name: Build
              run: one
            - name: Build
              run: two
            - name: Publish
              run: pnpm pkg-pr-new publish --pnpm --packageManager=pnpm --commentWithDev --commentWithSha
      ",
            },
          },
        },
      }
    `);
  });
});
