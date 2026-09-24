import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { blockExports } from './blockExports.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockExports, () => {
  it('without addons', () => {
    const creation = testBlock(blockExports, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "properties": {
                "exports": {
                  ".": "./dist/index.mjs",
                  "./package.json": "./package.json",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
      }
    `);
  });

  it('without addons (devExports: true)', () => {
    const creation = testBlock(blockExports, {
      options: { ...optionsBase, devExports: true },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "properties": {
                "exports": {
                  ".": "./src/index.ts",
                  "./package.json": "./package.json",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "exports": {
                ".": "./dist/index.mjs",
                "./package.json": "./package.json",
              },
            },
            "block": "[Block Publish Config]",
          },
        ],
      }
    `);
  });

  it('with addons (no leading ./)', () => {
    const creation = testBlock(blockExports, {
      addons: {
        filePath: 'other.js',
        srcFilePath: 'other.ts',
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "properties": {
                "exports": {
                  ".": "./other.js",
                  "./package.json": "./package.json",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
      }
    `);
  });

  it('with addons (with leading ./)', () => {
    const creation = testBlock(blockExports, {
      addons: {
        filePath: './other.js',
        srcFilePath: './other.ts',
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "properties": {
                "exports": {
                  ".": "./other.js",
                  "./package.json": "./package.json",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
      }
    `);
  });

  it('with addons (devExports: true)', () => {
    const creation = testBlock(blockExports, {
      addons: {
        filePath: './other.js',
        srcFilePath: './other.ts',
      },
      options: { ...optionsBase, devExports: true },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "properties": {
                "exports": {
                  ".": "./other.ts",
                  "./package.json": "./package.json",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "exports": {
                ".": "./other.js",
                "./package.json": "./package.json",
              },
            },
            "block": "[Block Publish Config]",
          },
        ],
      }
    `);
  });
});
