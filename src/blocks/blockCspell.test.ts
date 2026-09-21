import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test, vi } from 'vitest';

import { blockCspell } from './blockCspell.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../utils/resolveBin.ts', () => ({
  resolveBin: (bin: string) => `path/to/${bin}/bin/index.mjs`,
}));

vi.mock('../data/packageData.ts', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockCspell, () => {
  test('without addons or options', () => {
    const creation = testBlock(blockCspell, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Linting": {
                  "contents": {
                    "items": [
                      "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
                    ],
                  },
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                "streetsidesoftware.code-spell-checker",
              ],
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Lint Spelling",
                  "steps": [
                    {
                      "run": "pnpm lint:spelling",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "cspell": "1.2.3",
                },
                "scripts": {
                  "lint:spelling": "cspell "**" ".github/**/*"",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
        "files": {
          "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","package.json","pnpm-lock.yaml"]}",
        },
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockCspell, {
      addons: {
        ignorePaths: ['dist/'],
        words: ['michaelfaith'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Linting": {
                  "contents": {
                    "items": [
                      "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
                    ],
                  },
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                "streetsidesoftware.code-spell-checker",
              ],
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Lint Spelling",
                  "steps": [
                    {
                      "run": "pnpm lint:spelling",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "cspell": "1.2.3",
                },
                "scripts": {
                  "lint:spelling": "cspell "**" ".github/**/*"",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
        "files": {
          "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","dist/","node_modules","package.json","pnpm-lock.yaml"],"words":["michaelfaith"]}",
        },
      }
    `);
  });

  test('with options', () => {
    const creation = testBlock(blockCspell, {
      options: {
        ...optionsBase,
        words: ['michaelfaith'],
      },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Linting": {
                  "contents": {
                    "items": [
                      "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
                    ],
                  },
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                "streetsidesoftware.code-spell-checker",
              ],
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Lint Spelling",
                  "steps": [
                    {
                      "run": "pnpm lint:spelling",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "cspell": "1.2.3",
                },
                "scripts": {
                  "lint:spelling": "cspell "**" ".github/**/*"",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
        "files": {
          "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","package.json","pnpm-lock.yaml"],"words":["michaelfaith"]}",
        },
      }
    `);
  });

  test('setup mode', () => {
    const creation = testBlock(blockCspell, {
      mode: 'setup',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Linting": {
                  "contents": {
                    "items": [
                      "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
                    ],
                  },
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                "streetsidesoftware.code-spell-checker",
              ],
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Lint Spelling",
                  "steps": [
                    {
                      "run": "pnpm lint:spelling",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "cspell": "1.2.3",
                },
                "scripts": {
                  "lint:spelling": "cspell "**" ".github/**/*"",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
        ],
        "files": {
          "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","package.json","pnpm-lock.yaml"]}",
        },
        "scripts": [
          {
            "commands": [
              "node path/to/cspell-populate-words/bin/index.mjs --words "access" --words "public" --words "contact" --words "email" --words "github@email.com" --words "url" --words "http://contact.url" --words "description" --words "Test description" --words "directory" --words "." --words "documentation" --words "readme" --words "usage" --words "Test usage." --words "emoji" --words "✨" --words "node" --words "supported" --words "^24.15.0 || >=26.0.0" --words "pinned" --words "24.19.0" --words "owner" --words "test-owner" --words "packageName" --words "test-package-name" --words "preset" --words "minimal" --words "repository" --words "test-repository" --words "title" --words "Test Title"",
            ],
            "phase": 3,
          },
        ],
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockCspell, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Linting": {
                  "contents": {
                    "items": [
                      "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
                    ],
                  },
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                "streetsidesoftware.code-spell-checker",
              ],
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Lint Spelling",
                  "steps": [
                    {
                      "run": "pnpm lint:spelling",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "cspell": "1.2.3",
                },
                "scripts": {
                  "lint:spelling": "cspell "**" ".github/**/*"",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "workflows": [
                "lint-spelling",
                "spelling",
              ],
            },
            "block": "[Block Remove Workflows]",
          },
        ],
        "files": {
          "cspell.json": "{"dictionaries":["npm","node","typescript"],"ignorePaths":[".github","CHANGELOG.md","dist","node_modules","package.json","pnpm-lock.yaml"]}",
        },
      }
    `);
  });

  describe('intake', () => {
    it('returns undefined when cspell.json does not exist', () => {
      const actual = testIntake(blockCspell, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when cspell.json does not contain truthy data', () => {
      const actual = testIntake(blockCspell, {
        files: {
          'cspell.json': [JSON.stringify(null)],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when cspell.json contains invalid data', () => {
      const actual = testIntake(blockCspell, {
        files: {
          'cspell.json': [JSON.stringify({ ignorePaths: true })],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns the data when cspell.json contains ignorePaths and words', () => {
      const data = {
        ignorePaths: ['other'],
        words: ['abc', 'def'],
      };

      const actual = testIntake(blockCspell, {
        files: {
          'cspell.json': [JSON.stringify(data)],
        },
      });

      expect(actual).toEqual(data);
    });
  });
});
