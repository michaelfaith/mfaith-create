import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockGitattributes } from './blockGitattributes.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockGitattributes, () => {
  test('without props', () => {
    const creation = testBlock(blockGitattributes, {
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
    const creation = testBlock(blockGitattributes, {
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
