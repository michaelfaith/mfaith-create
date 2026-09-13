import { describe, expect, it } from 'vitest';

import { getNodeMatrixVersions } from './getNodeMatrixVersions.ts';

describe(getNodeMatrixVersions, () => {
  it.each([
    ['20.11.1', ['20.11.1', 20]],
    ['^20.11.1', ['20.11.1', 20]],
    ['20.*', ['20.0.0', 20]],
    ['20.x', ['20.0.0', 20]],
  ])('returns the minimum version and major for %s', (range, expected) => {
    expect(getNodeMatrixVersions(range)).toEqual(expected);
  });

  it.each([
    ['>=18.12.0 <21', ['18.12.0', 18, '19.0.0', 19, '20.0.0', 20]],
    [
      '>=18.12.0 <=21.0.0',
      ['18.12.0', 18, '19.0.0', 19, '20.0.0', 20, '21.0.0', 21],
    ],
  ])(
    'expands bounded ranges across supported majors for %s',
    (range, expected) => {
      expect(getNodeMatrixVersions(range)).toEqual(expected);
    },
  );

  it.each([
    ['^24.15.0 || >=26.0.0', ['24.15.0', 24, '26.0.0', 26]],
    ['^18.17.0 || ^20.0.0', ['18.17.0', 18, '20.0.0', 20]],
  ])('combines OR clauses for %s', (range, expected) => {
    expect(getNodeMatrixVersions(range)).toEqual(expected);
  });

  it('keeps the lowest version when OR clauses overlap', () => {
    expect(getNodeMatrixVersions('^20.11.1 || ^20.5.0')).toEqual([
      '20.5.0',
      20,
    ]);
  });

  it('keeps an existing lower version when a later clause is higher', () => {
    expect(getNodeMatrixVersions('^20.5.0 || ^20.11.1')).toEqual([
      '20.5.0',
      20,
    ]);
  });

  it('uses the highest lower bound in a comparator set', () => {
    expect(getNodeMatrixVersions('>=18.17.0 >=18.12.0 <19')).toEqual([
      '18.17.0',
      18,
    ]);
  });

  it('does not treat a partial-major upper bound as a finite major boundary', () => {
    expect(getNodeMatrixVersions('>=18.12.0 <21.5.0')).toEqual(['18.12.0', 18]);
  });

  it('sorts majors numerically regardless of clause order', () => {
    expect(getNodeMatrixVersions('^22.0.0 || ^18.17.0 || ^20.0.0')).toEqual([
      '18.17.0',
      18,
      '20.0.0',
      20,
      '22.0.0',
      22,
    ]);
  });

  it('represents an open-ended range with only its starting major', () => {
    expect(getNodeMatrixVersions('>=26.0.0')).toEqual(['26.0.0', 26]);
  });

  it('returns no versions when a range has no lower bound', () => {
    expect(getNodeMatrixVersions('<21')).toEqual([]);
  });

  it('throws for an invalid semver range', () => {
    expect(() => getNodeMatrixVersions('not-a-range')).toThrow();
  });
});
