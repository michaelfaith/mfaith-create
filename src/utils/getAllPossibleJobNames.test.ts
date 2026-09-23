import { describe, expect, it } from 'vitest';

import type { WorkflowJob } from '../blocks/workflows/schema.ts';
import { getAllPossibleJobNames } from './getAllPossibleJobNames.ts';

const createJob = (
  name: string,
  strategy?: WorkflowJob['strategy'],
): WorkflowJob => ({
  name,
  steps: [],
  strategy,
});

describe(getAllPossibleJobNames, () => {
  it.each([
    ['without a strategy', createJob('Test')],
    ['with an empty strategy', createJob('Test', {})],
    ['with an empty matrix', createJob('Test', { matrix: {} })],
  ])('returns the job name %s', (_case, job) => {
    expect(getAllPossibleJobNames(job)).toEqual(['Test']);
  });

  it('expands a matrix axis using string and numeric values', () => {
    const job = createJob('Test on ${{ matrix.node }}', {
      matrix: { node: ['20', 22] },
    });

    expect(getAllPossibleJobNames(job)).toEqual(['Test on 20', 'Test on 22']);
  });

  it('supports whitespace around matrix expressions', () => {
    const job = createJob('Test on ${{  matrix.node  }}', {
      matrix: { node: ['20'] },
    });

    expect(getAllPossibleJobNames(job)).toEqual(['Test on 20']);
  });

  it('replaces every occurrence of a matrix expression', () => {
    const job = createJob('${{ matrix.os }}: ${{ matrix.os }}', {
      matrix: { os: ['ubuntu'] },
    });

    expect(getAllPossibleJobNames(job)).toEqual(['ubuntu: ubuntu']);
  });

  it('creates the Cartesian product for multiple matrix axes', () => {
    const job = createJob('${{ matrix.os }} / Node ${{ matrix.node }}', {
      matrix: {
        os: ['ubuntu', 'windows'],
        node: [20, 22],
      },
    });

    expect(getAllPossibleJobNames(job)).toEqual([
      'ubuntu / Node 20',
      'windows / Node 20',
      'ubuntu / Node 22',
      'windows / Node 22',
    ]);
  });

  it('leaves matrix expressions without a matching axis unchanged', () => {
    const job = createJob('${{ matrix.os }} / ${{ matrix.node }}', {
      matrix: { os: ['ubuntu'] },
    });

    expect(getAllPossibleJobNames(job)).toEqual([
      'ubuntu / ${{ matrix.node }}',
    ]);
  });

  it('deduplicates names when an axis is not used in the job name', () => {
    const job = createJob('Test', {
      matrix: { os: ['ubuntu', 'ubuntu'] },
    });

    expect(getAllPossibleJobNames(job)).toEqual(['Test']);
  });

  it('returns the unreplaced name when an axis has no values', () => {
    const job = createJob('Test on ${{ matrix.os }}', {
      matrix: { os: [] },
    });

    expect(getAllPossibleJobNames(job)).toEqual(['Test on ${{ matrix.os }}']);
  });

  it('does not mutate the job or its matrix', () => {
    const job = createJob('Test on ${{ matrix.os }}', {
      matrix: { os: ['ubuntu', 'windows'] },
    });
    const originalStrategy = structuredClone(job.strategy);

    getAllPossibleJobNames(job);

    expect(job.strategy).toEqual(originalStrategy);
  });
});
