import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockExampleFiles } from './blockExampleFiles.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockExampleFiles, () => {
  test('without props.files', () => {
    const creation = testBlock(blockExampleFiles, {
      props: {},
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props.files and without mode', () => {
    const creation = testBlock(blockExampleFiles, {
      props: {
        files: {
          'index.ts': "console.log('Hello, world!');",
        },
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props.files and mode: setup', () => {
    const creation = testBlock(blockExampleFiles, {
      props: {
        files: {
          'index.ts': "console.log('Hello, world!');",
        },
      },
      mode: 'setup',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block README.md]",
            "props": {
              "defaultUsage": undefined,
            },
          },
        ],
        "files": {
          "src": {
            "index.ts": "console.log('Hello, world!');",
          },
        },
      }
    `);
  });
});
