import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { blockPublishConfig } from './blockPublishConfig.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockPublishConfig, () => {
  it('without addons', () => {
    const creation = testBlock(blockPublishConfig, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  it('with addons', () => {
    const creation = testBlock(blockPublishConfig, {
      addons: {
        access: 'public',
        exports: {
          '.': './dist/index.mjs',
          './package.json': './package.json',
        },
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "properties": {
                "publishConfig": {
                  "access": "public",
                  "exports": {
                    ".": "./dist/index.mjs",
                    "./package.json": "./package.json",
                  },
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
      }
    `);
  });
});
