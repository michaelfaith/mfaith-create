import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockEslintMoreStyling } from './blockEslintMoreStyling.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockEslintMoreStyling', () => {
  test('production', () => {
    const creation = testBlock(blockEslintMoreStyling, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                  "rules": [
                    {
                      "comment": "Stylistic concerns that don't interfere with Prettier",
                      "entries": {
                        "logical-assignment-operators": [
                          "error",
                          "always",
                          {
                            "enforceForIfStatements": true,
                          },
                        ],
                        "no-useless-rename": "error",
                        "object-shorthand": "error",
                        "operator-assignment": "error",
                      },
                    },
                  ],
                },
              ],
            },
            "block": "[Block ESLint]",
          },
        ],
      }
    `);
  });
});
