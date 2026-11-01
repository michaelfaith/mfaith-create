import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockPrettierPluginSentencesPerLine } from './blockPrettierPluginSentencesPerLine.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockPrettierPluginSentencesPerLine', () => {
  test('production', () => {
    const creation = testBlock(blockPrettierPluginSentencesPerLine, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Prettier]",
            "props": {
              "plugins": [
                "prettier-plugin-sentences-per-line",
              ],
            },
          },
        ],
      }
    `);
  });
});
