import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { sideEffects } from './sideEffects.ts';

describe(sideEffects, () => {
  it('without props', () => {
    const creation = testBlock(sideEffects, { options: optionsBase });

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
    const creation = testBlock(sideEffects, {
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
    const creation = testBlock(sideEffects, {
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

  describe('intake', () => {
    it.each([undefined, 'invalid'])(
      "returns undefined when package.json's sideEffects is %j",
      (sideEffectsValue) => {
        const actual = testIntake(sideEffects, {
          files: { 'package.json': [JSON.stringify({ sideEffects: sideEffectsValue })] },
        });

        expect(actual).toBeUndefined();
      },
    );

    it('returns undefined when there is no package.json', () => {
      const actual = testIntake(sideEffects, { files: {} });

      expect(actual).toBeUndefined();
    });

    it.each([[false], [true], [['./main.js']]])(
      "returns package.json's sideEffects when it is %j",
      (sideEffectsValue) => {
        const actual = testIntake(sideEffects, {
          files: { 'package.json': [JSON.stringify({ sideEffects: sideEffectsValue })] },
        });

        expect(actual).toEqual({ sideEffects: sideEffectsValue });
      },
    );
  });
});
