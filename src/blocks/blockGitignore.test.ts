import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockGitignore } from './blockGitignore.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockGitignore, () => {
  test('without props', () => {
    const creation = testBlock(blockGitignore, {
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
    const creation = testBlock(blockGitignore, {
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
