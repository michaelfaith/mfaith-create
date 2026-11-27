import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { eslintNode } from './eslintNode.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../utils/resolveBin.ts', () => ({
  resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(eslintNode, () => {
  test('production', () => {
    const creation = testBlock(eslintNode, {
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
          },
        ],
      }
    `);
  });
});
