import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { blockExports } from './blockExports.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockExports, () => {
  it('without props', () => {
    const creation = testBlock(blockExports, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "exports": {
                  ".": "./dist/index.mjs",
                  "./package.json": "./package.json",
                },
              },
            },
          },
        ],
      }
    `);
  });

  it('without props (devExports: true)', () => {
    const creation = testBlock(blockExports, {
      options: { ...optionsBase, devExports: true },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "exports": {
                  ".": "./src/index.ts",
                  "./package.json": "./package.json",
                },
              },
            },
          },
          {
            "block": "[Block Publish Config]",
            "props": {
              "exports": {
                ".": "./dist/index.mjs",
                "./package.json": "./package.json",
              },
            },
          },
        ],
      }
    `);
  });

  it('with props (no leading ./)', () => {
    const creation = testBlock(blockExports, {
      props: {
        filePath: 'other.js',
        srcFilePath: 'other.ts',
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
                "exports": {
                  ".": "./other.js",
                  "./package.json": "./package.json",
                },
              },
            },
          },
        ],
      }
    `);
  });

  it('with props (with leading ./)', () => {
    const creation = testBlock(blockExports, {
      props: {
        filePath: './other.js',
        srcFilePath: './other.ts',
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
                "exports": {
                  ".": "./other.js",
                  "./package.json": "./package.json",
                },
              },
            },
          },
        ],
      }
    `);
  });

  it('with props (devExports: true)', () => {
    const creation = testBlock(blockExports, {
      props: {
        filePath: './other.js',
        srcFilePath: './other.ts',
      },
      options: { ...optionsBase, devExports: true },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "exports": {
                  ".": "./other.ts",
                  "./package.json": "./package.json",
                },
              },
            },
          },
          {
            "block": "[Block Publish Config]",
            "props": {
              "exports": {
                ".": "./other.js",
                "./package.json": "./package.json",
              },
            },
          },
        ],
      }
    `);
  });
});
