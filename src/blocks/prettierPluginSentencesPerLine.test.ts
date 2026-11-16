import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { prettierPluginSentencesPerLine } from './prettierPluginSentencesPerLine.ts';

describe(prettierPluginSentencesPerLine, () => {
  test('production', () => {
    const creation = testBlock(prettierPluginSentencesPerLine, {
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
