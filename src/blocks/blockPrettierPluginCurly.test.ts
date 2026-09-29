import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockPrettierPluginCurly } from './blockPrettierPluginCurly.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockPrettierPluginCurly', () => {
  test('production', () => {
    const creation = testBlock(blockPrettierPluginCurly, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "plugins": [
                "prettier-plugin-curly",
              ],
            },
            "block": "[Block Prettier]",
          },
        ],
      }
    `);
  });
});
