import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { blockSideEffects } from './blockSideEffects.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockSideEffects, () => {
  it('without props', () => {
    const creation = testBlock(blockSideEffects, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "sideEffects": false,
              },
            },
          },
        ],
      }
    `);
  });

  it('with props (boolean)', () => {
    const creation = testBlock(blockSideEffects, {
      props: {
        sideEffects: true,
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
                "sideEffects": true,
              },
            },
          },
        ],
      }
    `);
  });

  it('with props (Array)', () => {
    const creation = testBlock(blockSideEffects, {
      props: {
        sideEffects: ['./main.js'],
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
                "sideEffects": [
                  "./main.js",
                ],
              },
            },
          },
        ],
      }
    `);
  });
});
