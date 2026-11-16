import { describe, expect, it, vi } from 'vitest';

import {
  getPackageDependencies,
  getPackageDependency,
  getPackageDevDependencies,
  getVersionForDevDependency,
} from './packageData.ts';

vi.mock('../../package.json', () => ({
  default: {
    dependencies: {
      'package-dep': '0.0.2',
      'package-range-dep': '^0.0.3',
    },
    devDependencies: {
      'package-dev-dep': '0.0.1',
    },
  },
}));

describe('packageData', () => {
  describe(getPackageDependencies, () => {
    it('returns a devDependency when it exists', () => {
      const actual = getPackageDependencies('package-dev-dep');

      expect(actual).toEqual({ 'package-dev-dep': '0.0.1' });
    });

    it('returns a dependency when it exists', () => {
      const actual = getPackageDependencies('package-dep');

      expect(actual).toEqual({ 'package-dep': '0.0.2' });
    });

    it('preserves range prefixes from dependencies', () => {
      const actual = getPackageDependencies('package-range-dep');

      expect(actual).toEqual({ 'package-range-dep': '^0.0.3' });
    });

    it('throws an error when neither exist', () => {
      const act = () => getPackageDependencies('package-unknown');

      expect(act).toThrow(
        "'package-unknown' is neither in package.json's dependencies nor its devDependencies.",
      );
    });
  });

  describe(getPackageDependency, () => {
    it('returns the raw version string with prefix intact', () => {
      expect(getPackageDependency('package-range-dep')).toBe('^0.0.3');
    });
  });

  describe(getVersionForDevDependency, () => {
    it('strips leading ^ or ~ range prefix', () => {
      expect(getVersionForDevDependency('package-range-dep')).toBe('0.0.3');
    });

    it('leaves already pinned versions unchanged', () => {
      expect(getVersionForDevDependency('package-dev-dep')).toBe('0.0.1');
    });
  });

  describe(getPackageDevDependencies, () => {
    it('returns record with stripped range prefixes', () => {
      expect(getPackageDevDependencies('package-range-dep', 'package-dev-dep')).toEqual({
        'package-dev-dep': '0.0.1',
        'package-range-dep': '0.0.3',
      });
    });
  });
});
