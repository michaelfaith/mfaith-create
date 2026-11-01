import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../utils/resolveBin.ts', () => ({
  resolveBin: (packageName: string) => `path/to/${packageName}/bin/index.mjs`,
}));

describe(blockRemoveDependencies, () => {
  test('without props or mode', () => {
    const creation = testBlock(blockRemoveDependencies, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props', () => {
    const creation = testBlock(blockRemoveDependencies, {
      props: {
        dependencies: ['a', 'b', 'c'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with mode', () => {
    const creation = testBlock(blockRemoveDependencies, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props and mode', () => {
    const creation = testBlock(blockRemoveDependencies, {
      props: {
        dependencies: ['a', 'b', 'c'],
      },
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "scripts": [
          {
            "commands": [
              "node path/to/remove-dependencies/bin/index.mjs a b c",
            ],
            "phase": 3,
          },
        ],
      }
    `);
  });
});
