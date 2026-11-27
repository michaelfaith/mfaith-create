import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { removeDependencies } from './removeDependencies.ts';

vi.mock('../utils/resolveBin.ts', () => ({
  resolveBin: (packageName: string) => `path/to/${packageName}/bin/index.mjs`,
}));

describe(removeDependencies, () => {
  test('without props or mode', () => {
    const creation = testBlock(removeDependencies, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props', () => {
    const creation = testBlock(removeDependencies, {
      props: {
        dependencies: ['a', 'b', 'c'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with mode', () => {
    const creation = testBlock(removeDependencies, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`{}`);
  });

  test('with props and mode', () => {
    const creation = testBlock(removeDependencies, {
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
