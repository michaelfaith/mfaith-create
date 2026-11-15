import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { blockPublishConfig } from './publishConfig.ts';

describe(blockPublishConfig, () => {
  it('without props', () => {
    const creation = testBlock(blockPublishConfig, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  it('with props', () => {
    const creation = testBlock(blockPublishConfig, {
      props: {
        access: 'public',
        bin: './dist/bin/index.mjs',
        exports: {
          '.': './dist/index.mjs',
          './package.json': './package.json',
        },
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "publishConfig": {
                  "access": "public",
                  "bin": "./dist/bin/index.mjs",
                  "exports": {
                    ".": "./dist/index.mjs",
                    "./package.json": "./package.json",
                  },
                },
              },
            },
          },
        ],
      }
    `);
  });
});
