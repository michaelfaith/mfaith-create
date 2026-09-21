import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { blockEslintNode } from './blockEslintNode.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../utils/resolveBin.ts', () => ({
  resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe('blockEslintNode', () => {
  test('production', () => {
    const creation = testBlock(blockEslintNode, {
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
                    "n.configs["flat/recommended"]",
                  ],
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                },
                {
                  "extends": [
                    "tseslint.configs.disableTypeChecked",
                  ],
                  "files": [
                    "**/*.md/*.ts",
                  ],
                  "rules": {
                    "n/no-missing-import": "off",
                  },
                },
                {
                  "files": [
                    "./eslint.config.ts",
                    "./**/*.test.*",
                  ],
                  "rules": {
                    "n/no-unsupported-features/node-builtins": "off",
                  },
                },
              ],
              "imports": [
                {
                  "source": "eslint-plugin-n",
                  "specifier": "n",
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
