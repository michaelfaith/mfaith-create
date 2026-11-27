import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { publishConfig } from './publishConfig.ts';

describe(publishConfig, () => {
  it('without props', () => {
    const creation = testBlock(publishConfig, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  it('with props', () => {
    const creation = testBlock(publishConfig, {
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
