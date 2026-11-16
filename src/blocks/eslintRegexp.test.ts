import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { eslintRegexp } from './eslintRegexp.ts';
import { optionsBase } from './options.fakes.ts';

describe(eslintRegexp, () => {
  test('production', () => {
    const creation = testBlock(eslintRegexp, {
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
