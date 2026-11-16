import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { exports } from './exports.ts';
import { optionsBase } from './options.fakes.ts';

describe(exports, () => {
  it('without props', () => {
    const creation = testBlock(exports, { options: optionsBase });

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
    const creation = testBlock(exports, {
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
    const creation = testBlock(exports, {
      props: {
        exports: {
          '.': {
            path: 'other.js',
            srcPath: 'other.ts',
          },
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
    const creation = testBlock(exports, {
      props: {
        exports: {
          '.': {
            path: './other.js',
            srcPath: './other.ts',
          },
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
    const creation = testBlock(exports, {
      props: {
        exports: {
          '.': {
            path: './other.js',
            srcPath: './other.ts',
          },
          './second': {
            path: './second/index.js',
            srcPath: './second/index.ts',
          },
        },
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
                  "./second": "./second/index.ts",
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
                "./second": "./second/index.js",
              },
            },
          },
        ],
      }
    `);
  });
});
