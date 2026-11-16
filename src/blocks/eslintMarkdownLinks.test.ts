import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { eslintMarkdownLinks } from './eslintMarkdownLinks.ts';
import { optionsBase } from './options.fakes.ts';

describe(eslintMarkdownLinks, () => {
  test('production', () => {
    const creation = testBlock(eslintMarkdownLinks, {
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
          },
        ],
      }
    `);
  });
});
