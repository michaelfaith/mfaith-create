import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { eslintJsdoc } from './eslintJsdoc.ts';
import { optionsBase } from './options.fakes.ts';

describe(eslintJsdoc, () => {
  test('production', () => {
    const creation = testBlock(eslintJsdoc, {
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
                    "jsdoc.configs['flat/contents-typescript-error']",
                    "jsdoc.configs['flat/logical-typescript-error']",
                    "jsdoc.configs['flat/stylistic-typescript-error']",
                  ],
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                },
              ],
              "imports": [
                {
                  "source": "eslint-plugin-jsdoc",
                  "specifier": "jsdoc",
                },
              ],
            },
          },
        ],
      }
    `);
  });
});
