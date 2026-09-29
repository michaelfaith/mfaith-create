import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockEslintMarkdown } from './blockEslintMarkdown.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockEslintMarkdown', () => {
  test('production', () => {
    const creation = testBlock(blockEslintMarkdown, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "extensions": [
                {
                  "extends": [
                    "markdown.configs.recommended",
                  ],
                  "files": [
                    "**/*.md",
                  ],
                  "rules": [
                    {
                      "comment": "https://github.com/eslint/markdown/issues/294",
                      "entries": {
                        "markdown/no-missing-label-refs": "off",
                      },
                    },
                  ],
                },
              ],
              "imports": [
                {
                  "source": "@eslint/markdown",
                  "specifier": "markdown",
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "dependencies": [
                "eslint-plugin-markdown",
                "markdownlint",
                "markdownlint-cli",
              ],
            },
            "block": "[Block Remove Dependencies]",
          },
          {
            "addons": {
              "files": [
                ".markdownlint*",
                ".markdownlintignore",
              ],
            },
            "block": "[Block Remove Files]",
          },
          {
            "addons": {
              "workflows": [
                "lint_markdown",
                "lint_md",
              ],
            },
            "block": "[Block Remove Workflows]",
          },
        ],
      }
    `);
  });
});
