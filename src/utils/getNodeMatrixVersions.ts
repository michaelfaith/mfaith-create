import semver, { type Comparator, Range, SemVer } from 'semver';

export type NodeMatrixVersion = string | number;

/**
 * Converts a Node semver range into versions suitable for a GitHub Actions matrix.
 *
 * For each supported major, the result contains:
 *   1. the lowest supported concrete version for that major
 *   2. the numeric major, which GitHub's setup-node treats as "latest"
 *
 * Open-ended ranges such as ">=26.0.0" are represented by their starting major only, since there is no finite set of future majors to enumerate.
 * @example
 *   ^24.15.0 || >=26.0.0
 *     => ["24.15.0", 24, "26.0.0", 26]
 *
 *   >=18.12.0 &lt;21
 *     => ["18.12.0", 18, "19.0.0", 19, "20.0.0", 20]
 *
 *   ^18.17.0 || ^20.0.0
 *     => ["18.17.0", 18, "20.0.0", 20]
 */
export function getNodeMatrixVersions(range: string): NodeMatrixVersion[] {
  const majorVersions = new Map<number, string>();

  for (const rawRange of range.split('||')) {
    const parsedRange = new Range(rawRange.trim());

    // A Range can contain multiple comparator sets for some syntaxes.
    for (const comparators of parsedRange.set) {
      const minimum = getMinimumVersion(comparators);

      if (!minimum) {
        continue;
      }

      const lowerMajor = minimum.major;
      const upperMajor = getUpperMajor(comparators);

      // Open-ended range, e.g. >=26.0.0.
      //
      // We intentionally represent only the first supported major because
      // every future major would otherwise be part of the matrix forever.
      const lastMajor = upperMajor ?? lowerMajor;

      for (let major = lowerMajor; major <= lastMajor; major++) {
        const minimumForMajor =
          major === lowerMajor ? minimum : new SemVer(`${major}.0.0`);

        const version = minimumForMajor.version;
        const existing = majorVersions.get(major);

        // Multiple OR clauses can overlap. Keep the lowest supported version.
        if (!existing || semver.lt(version, existing)) {
          majorVersions.set(major, version);
        }
      }
    }
  }

  return [...majorVersions.entries()]
    .sort(([a], [b]) => a - b)
    .flatMap(([major, version]) => [version, major]);
}

/**
 * Find the minimum version accepted by a comparator set.
 */
function getMinimumVersion(
  comparators: readonly Comparator[],
): SemVer | undefined {
  let minimum: SemVer | undefined;

  for (const comparator of comparators) {
    if (comparator.operator === '<' || comparator.operator === '<=') {
      continue;
    }

    const version = comparator.semver;

    if (!minimum || semver.gt(version, minimum)) {
      minimum = version;
    }
  }

  return minimum;
}

/**
 * Find the first major that is NOT supported by a comparator set.
 *
 * For example:
 *   ^24.15.0
 * becomes >=24.15.0 &lt;25.0.0, so this returns 25.
 *
 * Therefore the last supported major is upperMajor - 1.
 */
function getUpperMajor(comparators: readonly Comparator[]): number | undefined {
  for (const comparator of comparators) {
    if (comparator.operator !== '<' && comparator.operator !== '<=') {
      continue;
    }

    const version = comparator.semver;

    // A bound such as <25.0.0 means majors through 24 are supported.
    if (version.major > 0 && version.minor === 0 && version.patch === 0) {
      return comparator.operator === '<' ? version.major - 1 : version.major;
    }
  }

  return undefined;
}
