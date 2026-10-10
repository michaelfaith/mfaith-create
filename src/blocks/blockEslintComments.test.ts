import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockEslintComments } from './blockEslintComments.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockEslintComments', () => {
  test('production', () => {
    const creation = testBlock(blockEslintComments, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block ESLint]",
            "props": {
              "extensions": [
                {
                  "extends": [
                    "comments.recommended",
                  ],
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                },
              ],
              "imports": [
                {
                  "source": "@eslint-community/eslint-plugin-eslint-comments/configs",
                  "specifier": "comments",
                },
              ],
            },
          },
        ],
      }
    `);
  });
});
