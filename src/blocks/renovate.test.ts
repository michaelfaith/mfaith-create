import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { renovate } from './renovate.ts';

describe(renovate, () => {
  test('without props', () => {
    const creation = testBlock(renovate, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Apps]",
            "props": {
              "apps": [
                {
                  "name": "Renovate",
                  "url": "https://github.com/apps/renovate",
                },
              ],
            },
          },
        ],
        "files": {
          ".github": {
            "renovate.json": "{"$schema":"https://docs.renovatebot.com/renovate-schema.json","automerge":true,"extends":[":preserveSemverRanges","config:best-practices","replacements:all"],"labels":["dependencies"],"minimumReleaseAge":"7 days","postUpdateOptions":["pnpmDedupe"]}",
          },
        },
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(renovate, {
      props: {
        ignoreDeps: ['@all-contributors/cli'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Apps]",
            "props": {
              "apps": [
                {
                  "name": "Renovate",
                  "url": "https://github.com/apps/renovate",
                },
              ],
            },
          },
        ],
        "files": {
          ".github": {
            "renovate.json": "{"$schema":"https://docs.renovatebot.com/renovate-schema.json","automerge":true,"extends":[":preserveSemverRanges","config:best-practices","replacements:all"],"ignoreDeps":["@all-contributors/cli"],"labels":["dependencies"],"minimumReleaseAge":"7 days","postUpdateOptions":["pnpmDedupe"]}",
          },
        },
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(renovate, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation.extensions).toMatchInlineSnapshot(`
			[
			  {
			    "block": "[Block GitHub Apps]",
			    "props": {
			      "apps": [
			        {
			          "name": "Renovate",
			          "url": "https://github.com/apps/renovate",
			        },
			      ],
			    },
			  },
			  {
			    "block": "[Block Remove Files]",
			    "props": {
			      "files": [
			        ".github/renovate.{json5,jsonc}",
			        ".renovaterc",
			        ".renovaterc.{json,json5,jsonc}",
			        "renovate.{json,json5,jsonc}",
			      ],
			    },
			  },
			]
		`);
  });

  describe('intake', () => {
    it('returns no ignoreDeps when .github/renovate.json does not exist', () => {
      const actual = testIntake(renovate, {
        files: {},
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps: [],
        packageRules: [],
      });
    });

    it('returns no ignoreDeps when .github/renovate.json does not contain truthy data', () => {
      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [JSON.stringify(null)],
          },
        },
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps: [],
        packageRules: [],
      });
    });

    it('returns no ignoreDeps when .github/renovate.json contains only unrelated data', () => {
      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [JSON.stringify({ other: true })],
          },
        },
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps: [],
        packageRules: [],
      });
    });

    it('returns ignoreDeps when .github/renovate.json contains ignoreDeps', () => {
      const ignoreDeps = ['@all-contributors/cli', 'codecov/codecov-action'];

      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [
              JSON.stringify({
                ignoreDeps,
              }),
            ],
          },
        },
      });

      expect(actual).toEqual({ customManagers: [], ignoreDeps, packageRules: [] });
    });

    it('returns ignoreDeps when .github/renovate.json contains ignoreDeps and other data', () => {
      const ignoreDeps = ['@all-contributors/cli', 'codecov/codecov-action'];

      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [
              JSON.stringify({
                ignoreDeps,
                other: true,
              }),
            ],
          },
        },
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps,
        packageRules: [],
      });
    });

    it('returns customManagers when .github/renovate.json contains customManagers', () => {
      const customManagers = [
        {
          customType: 'regex',
          datasourceTemplate: 'github-tags',
          managerFilePatterns: ['/^src/.+\\.ts$/'],
          matchStrings: ['uses\\("(?<depName>[^"]+)", "(?<currentValue>[^"]+)"'],
        },
      ];

      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [JSON.stringify({ customManagers })],
          },
        },
      });

      expect(actual).toEqual({
        customManagers,
        ignoreDeps: [],
        packageRules: [],
      });
    });

    it.each([
      ['renovate.json'],
      ['renovate.jsonc'],
      ['renovate.json5'],
      ['.renovaterc'],
      ['.renovaterc.json'],
      ['.renovaterc.jsonc'],
      ['.renovaterc.json5'],
    ])('returns data when only %s exists', (fileName) => {
      const ignoreDeps = ['all-contributors-cli'];

      const actual = testIntake(renovate, {
        files: {
          [fileName]: [JSON.stringify({ ignoreDeps })],
        },
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps,
        packageRules: [],
      });
    });

    it('ignores invalid data in other files', () => {
      const ignoreDeps = ['all-contributors-cli'];

      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [JSON.stringify({ ignoreDeps })],
          },
          'renovate.json': [JSON.stringify({ ignoreDeps: 'invalid' })],
        },
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps,
        packageRules: [],
      });
    });

    it('merges data with the highest precedence last when multiple files exist', () => {
      const packageRules = [
        { enabled: false, matchDepNames: ['node'] },
        { automerge: false, matchDepNames: ['typescript'] },
        { automerge: false, matchDepNames: ['eslint'] },
      ];

      const actual = testIntake(renovate, {
        files: {
          '.github': {
            'renovate.json': [
              JSON.stringify({
                ignoreDeps: ['codecov/codecov-action'],
                packageRules: packageRules.slice(0, 2),
              }),
            ],
          },
          'renovate.json': [
            JSON.stringify({
              ignoreDeps: ['all-contributors-cli', 'codecov/codecov-action'],
              packageRules: packageRules.slice(1),
            }),
          ],
        },
      });

      expect(actual).toEqual({
        customManagers: [],
        ignoreDeps: ['codecov/codecov-action', 'all-contributors-cli'],
        packageRules,
      });
    });
  });
});
