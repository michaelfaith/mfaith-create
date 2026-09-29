import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockEslintMarkdownLinks } from './blockEslintMarkdownLinks.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockEslintMarkdownLinks', () => {
  test('production', () => {
    const creation = testBlock(blockEslintMarkdownLinks, {
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
                    "markdownLinks.configs.recommended",
                  ],
                  "files": [
                    "**/*.md",
                  ],
                },
              ],
              "imports": [
                {
                  "source": "eslint-plugin-markdown-links",
                  "specifier": "markdownLinks",
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
