import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { gitignore } from './gitignore.ts';
import { optionsBase } from './options.fakes.ts';

describe(gitignore, () => {
  test('without props', () => {
    const creation = testBlock(gitignore, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".gitignore": "/node_modules
			",
			  },
			}
		`);
  });

  test('with props', () => {
    const creation = testBlock(gitignore, {
      props: {
        ignores: ['/dist'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".gitignore": "/dist
			/node_modules
			",
			  },
			}
		`);
  });
});
