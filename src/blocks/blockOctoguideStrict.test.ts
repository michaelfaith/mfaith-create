import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockOctoguideStrict } from './blockOctoguideStrict.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockOctoguideStrict', () => {
  test('production', () => {
    const creation = testBlock(blockOctoguideStrict, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "config": "strict",
            },
            "block": "[Block OctoGuide]",
          },
        ],
      }
    `);
  });
});
