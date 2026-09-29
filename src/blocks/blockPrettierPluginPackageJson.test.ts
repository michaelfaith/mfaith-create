import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockPrettierPluginPackageJson } from './blockPrettierPluginPackageJson.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockPrettierPluginPackageJson', () => {
  test('production', () => {
    const creation = testBlock(blockPrettierPluginPackageJson, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "plugins": [
                "prettier-plugin-packagejson",
              ],
            },
            "block": "[Block Prettier]",
          },
        ],
      }
    `);
  });
});
