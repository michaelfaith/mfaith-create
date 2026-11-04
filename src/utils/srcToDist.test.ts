import { describe, expect, it } from 'vitest';

import { distToSrc, srcToDist } from './srcToDist.ts';

describe(distToSrc, () => {
  it.each([
    ['./dist/index.js', './src/index.ts'],
    ['../package/dist/bin/cli.cjs', '../package/src/bin/cli.ts'],
    ['./dist/index.mjs', './src/index.ts'],
    ['./dist/index.JS', './src/index.ts'],
    ['./dist/index.MJS', './src/index.ts'],
    ['./output/index.js', './output/index.ts'],
    ['./dist/index.ts', './src/index.ts'],
    ['./dist/index.jsx', './src/index.jsx'],
  ])('converts %s to %s', (input, expected) => {
    expect(distToSrc(input)).toBe(expected);
  });

  it('replaces only the first dist occurrence', () => {
    expect(distToSrc('./dist/generated/dist/entry.js')).toBe('./src/generated/dist/entry.ts');
  });
});

describe(srcToDist, () => {
  it.each([
    ['./src/index.ts', './dist/index.mjs'],
    ['../package/src/bin/cli.cts', '../package/dist/bin/cli.mjs'],
    ['./src/index.mts', './dist/index.mjs'],
    ['./src/index.TS', './dist/index.mjs'],
    ['./src/index.MTS', './dist/index.mjs'],
    ['./output/index.ts', './output/index.mjs'],
    ['./src/index.js', './dist/index.js'],
    ['./src/index.tsx', './dist/index.tsx'],
  ])('converts %s to %s', (input, expected) => {
    expect(srcToDist(input)).toBe(expected);
  });

  it('replaces only the first src occurrence', () => {
    expect(srcToDist('./src/generated/src/entry.ts')).toBe('./dist/generated/src/entry.mjs');
  });
});
