import { describe, expect, test } from 'vitest';

import { getPrimaryBin } from './getPrimaryBin.ts';

const repository = 'test-repository';

describe(getPrimaryBin, () => {
  test.each([
    [undefined, undefined],
    ['bin/index.mjs', 'bin/index.mjs'],
    [{ [repository]: 'bin/index.mjs' }, 'bin/index.mjs'],
    [{}, undefined],
    [{ other: 'bin/index.mjs' }, undefined],
  ])('%j', (bin, expected) => {
    expect(getPrimaryBin(bin, repository)).toBe(expected);
  });
});
