import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { templatedWith } from './templatedWith.ts';

vi.mock('../utils/resolveBin.ts', () => ({
  resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(templatedWith, () => {
  test('production with unknown owner', () => {
    const creation = testBlock(templatedWith, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block README.md]",
            "props": {
              "notices": [
                "
      <!-- You can remove this notice if you don't want it 🙂 no worries! -->",
                "> 💝 This package was templated with [\`@mfaith/create\`](https://github.com/michaelfaith/mfaith-create) using the [Bingo framework](https://create.bingo).
      ",
              ],
            },
          },
        ],
      }
    `);
  });

  test('production with JoshuaKGoldberg as owner', () => {
    const creation = testBlock(templatedWith, {
      options: {
        ...optionsBase,
        owner: 'michaelfaith',
      },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block README.md]",
            "props": {
              "notices": [
                "> 💝 This package was templated with [\`@mfaith/create\`](https://github.com/michaelfaith/mfaith-create) using the [Bingo framework](https://create.bingo).
      ",
              ],
            },
          },
        ],
      }
    `);
  });
});
