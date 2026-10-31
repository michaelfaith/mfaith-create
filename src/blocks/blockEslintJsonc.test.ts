import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockEslintJsonc } from './blockEslintJsonc.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockEslintJsonc', () => {
  test('production', () => {
    const creation = testBlock(blockEslintJsonc, {
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
