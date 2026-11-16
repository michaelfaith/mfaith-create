import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { gitattributes } from './gitattributes.ts';
import { optionsBase } from './options.fakes.ts';

describe(gitattributes, () => {
  test('without props', () => {
    const creation = testBlock(gitattributes, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".gitattributes": "# Enforce LF endings globally across all text files on any OS
      * text=auto eol=lf
      ",
        },
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(gitattributes, {
      props: {
        additionalAttributes: ['*.jpg binary', '*.png binary'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".gitattributes": "# Enforce LF endings globally across all text files on any OS
      * text=auto eol=lf

      # Additional attributes
      *.jpg binary
      *.png binary
      ",
        },
      }
    `);
  });
});
