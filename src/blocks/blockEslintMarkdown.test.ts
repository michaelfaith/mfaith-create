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
        "extensions": [
          {
            "block": "[Block ESLint]",
            "props": {
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
          },
          {
            "block": "[Block Remove Dependencies]",
            "props": {
              "dependencies": [
                "eslint-plugin-markdown",
                "markdownlint",
                "markdownlint-cli",
              ],
            },
          },
          {
            "block": "[Block Remove Files]",
            "props": {
              "files": [
                ".markdownlint*",
                ".markdownlintignore",
              ],
            },
          },
          {
            "block": "[Block Remove Workflows]",
            "props": {
              "workflows": [
                "lint_markdown",
                "lint_md",
              ],
            },
          },
        ],
      }
    `);
  });
});
