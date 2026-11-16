import { testBlock, testIntake } from 'bingo-stratum-testers';
import { dump } from 'js-yaml';
import { describe, expect, it, test } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { pnpmWorkspace } from './pnpmWorkspace.ts';

describe(pnpmWorkspace, () => {
  test('without props', () => {
    const creation = testBlock(pnpmWorkspace, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          "pnpm-workspace.yaml": "trustPolicy: no-downgrade
      ",
        },
      }
    `);
  });

  test('transition mode without files', () => {
    const creation = testBlock(pnpmWorkspace, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          "pnpm-workspace.yaml": "trustPolicy: no-downgrade
      ",
        },
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(pnpmWorkspace, {
      props: {
        config: {
          minimumReleaseAge: 1440,
          trustPolicy: 'off',
        },
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          "pnpm-workspace.yaml": "minimumReleaseAge: 1440

      trustPolicy: off
      ",
        },
      }
    `);
  });

  describe('intake', () => {
    it('returns undefined when pnpm-workspace.yaml does not exist', () => {
      const actual = testIntake(pnpmWorkspace, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('returns and empty object when pnpm-workspace.yaml is empty', () => {
      const actual = testIntake(pnpmWorkspace, {
        files: {
          'pnpm-workspace.yaml': [''],
        },
      });

      expect(actual).toEqual(undefined);
    });

    it('returns config when pnpm-workspace.yaml values', () => {
      const config = {
        minimumReleaseAge: 1440,
        minimumReleaseAgeExclude: ['react', 'webpack'],
      };

      const actual = testIntake(pnpmWorkspace, {
        files: {
          'pnpm-workspace.yaml': [dump(config)],
        },
      });

      expect(actual).toEqual({ config });
    });
  });
});
