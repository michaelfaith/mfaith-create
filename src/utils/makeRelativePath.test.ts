import { describe, expect, it } from 'vitest';

import { makeRelativePath } from './makeRelativePath.ts';

describe(makeRelativePath, () => {
  it.each([
    ['.', '.'],
    ['..', '..'],
    ['./file.txt', './file.txt'],
    ['../file.txt', '../file.txt'],
    ['.hidden', '.hidden'],
    ['./nested/file.txt', './nested/file.txt'],
  ])('returns dot-prefixed input %s unchanged', (inputPath, expected) => {
    expect(makeRelativePath(inputPath)).toBe(expected);
  });

  it.each([
    ['file.txt', './file.txt'],
    ['src/file.ts', './src/file.ts'],
  ])('joins non-dot (%s)', (inputPath, expected) => {
    expect(makeRelativePath(inputPath)).toBe(expected);
  });
});
