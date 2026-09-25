import { describe, expect, it } from 'vitest';

import { readDevExports } from './readDevExports.ts';

describe(readDevExports, () => {
  it('returns false when tsdown and packageData are empty', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({}),
      () => Promise.resolve({}),
    );

    expect(actual).toBe(false);
  });

  it('returns false when packageData just has exports but no publishConfig', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({}),
      () => Promise.resolve({ exports: { '.': './dist/index.mjs' } }),
    );

    expect(actual).toBe(false);
  });

  it('returns false when the tsdown config has exports true', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({ exports: true }),
      () => Promise.resolve({}),
    );

    expect(actual).toBe(false);
  });

  it('returns true when the tsdown config has exports.devExports true', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({ exports: { devExports: true } }),
      () => Promise.resolve({}),
    );

    expect(actual).toBe(true);
  });

  it('returns false when the tsdown config has exports.devExports false', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({ exports: { devExports: false } }),
      () => Promise.resolve({}),
    );

    expect(actual).toBe(false);
  });

  it('returns true when packageData has publishConfig.exports', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({}),
      () =>
        Promise.resolve({
          publishConfig: { exports: { '.': './dist/index.mjs' } },
        }),
    );

    expect(actual).toBe(true);
  });

  it('returns false when packageData has publishConfig but not exports', async () => {
    const actual = await readDevExports(
      () => Promise.resolve({}),
      () =>
        Promise.resolve({
          publishConfig: { access: 'public' },
        }),
    );

    expect(actual).toBe(false);
  });
});
