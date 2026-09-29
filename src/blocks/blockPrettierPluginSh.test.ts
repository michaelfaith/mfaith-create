import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockPrettierPluginSh } from './blockPrettierPluginSh.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockPrettierPluginSh', () => {
  test('production', () => {
    const creation = testBlock(blockPrettierPluginSh, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "plugins": [
                "prettier-plugin-sh",
              ],
            },
            "block": "[Block Prettier]",
          },
        ],
      }
    `);
  });
});
