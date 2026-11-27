import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { exampleFiles } from './exampleFiles.ts';
import { optionsBase } from './options.fakes.ts';

describe(exampleFiles, () => {
  test('without props.files', () => {
    const creation = testBlock(exampleFiles, {
      props: {},
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props.files and without mode', () => {
    const creation = testBlock(exampleFiles, {
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
    const creation = testBlock(exampleFiles, {
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
