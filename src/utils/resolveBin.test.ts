import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { findUpSync } from 'find-up-simple';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { clearCache, resolveBin } from './resolveBin.ts';

vi.mock('find-up-simple', () => ({
  findUpSync: vi.fn(),
}));

vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
}));

const mockFindUpSync = vi.mocked(findUpSync);
const mockReadFileSync = vi.mocked(readFileSync);

describe(resolveBin, () => {
  beforeEach(() => {
    clearCache();
  });

  it('resolves a string bin from an exported package manifest', () => {
    const packageJsonPath = fileURLToPath(
      import.meta.resolve('vitest/package.json'),
    );
    mockReadFileSync.mockReturnValue(JSON.stringify({ bin: 'bin/cli.js' }));

    const result = resolveBin('vitest');

    expect(result).toBe(resolve(dirname(packageJsonPath), 'bin/cli.js'));
    expect(mockReadFileSync).toHaveBeenCalledWith(packageJsonPath, 'utf8');
    expect(mockFindUpSync).not.toHaveBeenCalled();
  });

  it('resolves a named bin from an exported package manifest', () => {
    const packageJsonPath = fileURLToPath(
      import.meta.resolve('vitest/package.json'),
    );
    mockReadFileSync.mockReturnValue(
      JSON.stringify({ bin: { vitest: 'bin/vitest.js', cli: 'bin/cli.js' } }),
    );

    const result = resolveBin('vitest', 'cli');

    expect(result).toBe(resolve(dirname(packageJsonPath), 'bin/cli.js'));
  });

  it('uses the package name as the default named bin', () => {
    const packageJsonPath = fileURLToPath(
      import.meta.resolve('vitest/package.json'),
    );
    mockReadFileSync.mockReturnValue(
      JSON.stringify({ bin: { vitest: 'bin/vitest.js' } }),
    );

    const result = resolveBin('vitest');

    expect(result).toBe(resolve(dirname(packageJsonPath), 'bin/vitest.js'));
  });

  it('finds a manifest when the package does not export it', () => {
    const packageJsonPath = resolve('packages/example/package.json');
    mockFindUpSync.mockReturnValue(packageJsonPath);
    mockReadFileSync.mockReturnValue(
      JSON.stringify({ bin: { example: 'bin/example.js' } }),
    );

    const result = resolveBin('find-up-simple', 'example');

    expect(result).toBe(resolve(dirname(packageJsonPath), 'bin/example.js'));
    expect(mockFindUpSync).toHaveBeenCalledWith('package.json', {
      cwd: dirname(import.meta.resolve('find-up-simple')),
    });
  });

  it('throws when the package manifest cannot be found', () => {
    mockFindUpSync.mockReturnValue(undefined);

    expect(() => resolveBin('find-up-simple')).toThrow(
      'Unable to load "find-up-simple" bin for execution',
    );
    expect(mockReadFileSync).not.toHaveBeenCalled();
  });

  it('throws when the package has no requested bin', () => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ bin: {} }));

    expect(() => resolveBin('vitest', 'missing')).toThrow(
      'Package "vitest" has no bin named "missing".',
    );
  });

  it('caches the value for subsequent calls', () => {
    const packageJsonPath = resolve('packages/example/package.json');
    mockFindUpSync.mockReturnValue(packageJsonPath);
    mockReadFileSync.mockReturnValue(
      JSON.stringify({ bin: { example: 'bin/example.js' } }),
    );

    resolveBin('find-up-simple', 'example');
    resolveBin('find-up-simple', 'example');

    expect(mockFindUpSync).toHaveBeenCalledTimes(1);
  });
});
