import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { blockAreTheTypesWrong } from './blockAreTheTypesWrong.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.ts', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe('blockAreTheTypesWrong', () => {
  test('production', () => {
    const creation = testBlock(blockAreTheTypesWrong, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "@arethetypeswrong/core": "1.2.3",
                },
              },
            },
          },
          {
            "block": "[Block tsdown]",
            "props": {
              "attw": {
                "enabled": "ci-only",
                "level": "error",
                "profile": "esm-only",
              },
            },
          },
        ],
      }
    `);
  });
});
