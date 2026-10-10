import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockEslintRegexp } from './blockEslintRegexp.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockEslintRegexp', () => {
  test('production', () => {
    const creation = testBlock(blockEslintRegexp, {
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
                    "regexp.configs['flat/recommended']",
                  ],
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                },
              ],
              "imports": [
                {
                  "source": "eslint-plugin-regexp",
                  "specifier": "* as regexp",
                },
              ],
            },
          },
        ],
      }
    `);
  });
});
