import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { eslintComments } from './eslintComments.ts';
import { optionsBase } from './options.fakes.ts';

describe(eslintComments, () => {
  test('production', () => {
    const creation = testBlock(eslintComments, {
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
