import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockPrettierPluginPaddingLines } from './blockPrettierPluginPaddingLines.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockPrettierPluginPaddingLines', () => {
  test('production', () => {
    const creation = testBlock(blockPrettierPluginPaddingLines, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "plugins": [
                "prettier-plugin-padding-lines",
              ],
            },
            "block": "[Block Prettier]",
          },
        ],
      }
    `);
  });
});
