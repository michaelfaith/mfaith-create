import { describe, expect, it, vi } from 'vitest';

import { readPackageName } from './readPackageName.ts';

describe(readPackageName, () => {
  it('returns options.packageName when it exists', async () => {
    const packageName = 'test-package-name';
    const getPackageDataMock = vi
      .fn()
      .mockResolvedValueOnce({ name: 'test-name' });
    const getRepositoryMock = vi.fn();

    const options = { packageName };

    const actual = await readPackageName(
      getPackageDataMock,
      getRepositoryMock,
      options,
    );

    expect(actual).toBe(packageName);
  });

  it('returns package data name when options.packageName does not exist', async () => {
    const name = 'test-name';
    const getPackageDataMock = vi.fn().mockResolvedValueOnce({ name });
    const options = {};
    const getRepositoryMock = vi.fn();

    const actual = await readPackageName(
      getPackageDataMock,
      getRepositoryMock,
      options,
    );

    expect(actual).toBe(name);
  });

  it('returns repository name when neither options.packageName or packageData.name exist', async () => {
    const name = 'test-name';
    const getPackageDataMock = vi.fn().mockResolvedValueOnce({ name });
    const options = {};
    const getRepositoryMock = vi.fn();

    const actual = await readPackageName(
      getPackageDataMock,
      getRepositoryMock,
      options,
    );

    expect(actual).toBe(name);
  });
});
