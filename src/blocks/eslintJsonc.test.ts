import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { eslintJsonc } from './eslintJsonc.ts';
import { optionsBase } from './options.fakes.ts';

describe(eslintJsonc, () => {
  test('production', () => {
    const creation = testBlock(eslintJsonc, {
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
                    "jsonc.configs['flat/recommended-with-json']",
                  ],
                  "files": [
                    "**/*.json",
                  ],
                },
              ],
              "imports": [
                {
                  "source": "eslint-plugin-jsonc",
                  "specifier": "jsonc",
                },
              ],
            },
          },
        ],
      }
    `);
  });
});
