import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test, vi } from 'vitest';

import { blockTsdown } from './blockTsdown.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.js', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockTsdown, () => {
  test('without addons or options', () => {
    const creation = testBlock(blockTsdown, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Building": {
                  "contents": "
      Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

      \`\`\`shell
      pnpm build
      \`\`\`

      Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

      \`\`\`shell
      pnpm build --watch
      \`\`\`
      ",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Build",
                  "steps": [
                    {
                      "run": "pnpm build",
                    },
                  ],
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "tsdown": "1.2.3",
                },
                "files": [
                  "dist/",
                ],
                "scripts": {
                  "build": "tsdown",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
              "exclude": [
                "dist",
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig } from 'tsdown';

      export default defineConfig({});
      ",
        },
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockTsdown, {
      addons: {
        entry: ['src/other.ts'],
        properties: {
          dts: false,
        },
        runInCI: ['dist/other.js'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Building": {
                  "contents": "
      Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

      \`\`\`shell
      pnpm build
      \`\`\`

      Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

      \`\`\`shell
      pnpm build --watch
      \`\`\`
      ",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Build",
                  "steps": [
                    {
                      "run": "pnpm build",
                    },
                    {
                      "run": "dist/other.js",
                    },
                  ],
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "tsdown": "1.2.3",
                },
                "files": [
                  "dist/",
                ],
                "scripts": {
                  "build": "tsdown",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
              "exclude": [
                "dist",
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig } from 'tsdown';

      export default defineConfig({"entry":["src/index.ts","src/other.ts"],"dts":false});
      ",
        },
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockTsdown, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Building": {
                  "contents": "
      Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

      \`\`\`shell
      pnpm build
      \`\`\`

      Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

      \`\`\`shell
      pnpm build --watch
      \`\`\`
      ",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Build",
                  "steps": [
                    {
                      "run": "pnpm build",
                    },
                  ],
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "tsdown": "1.2.3",
                },
                "files": [
                  "dist/",
                ],
                "scripts": {
                  "build": "tsdown",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
              "exclude": [
                "dist",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "dependencies": [
                "@babel/cli",
                "@babel/core",
                "@babel/preset-typescript",
                "babel",
                "tsup",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": [
                ".babelrc*",
                "babel.config.*",
                "dist",
                "lib",
                "tsup.config.*",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "workflows": [
                "build",
                "tsup",
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig } from 'tsdown';

      export default defineConfig({});
      ",
        },
      }
    `);
  });

  describe('intake', () => {
    it('returns undefined when tsdown.config.ts does not exist', () => {
      const actual = testIntake(blockTsdown, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when tsdown.config.ts does not contain data', () => {
      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': ['...'],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when tsdown.config.ts does not contain properties', () => {
      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [`defineConfig(${JSON.stringify({})})`],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns entry when tsdown.config.ts contains entry', () => {
      const entry = ['src/index.ts', 'src/other.ts'];

      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [`defineConfig(${JSON.stringify({ entry })})`],
        },
      });

      expect(actual).toEqual({ entry });
    });

    it('returns the properties when tsdown.config.ts contains other properties', () => {
      const properties = { clean: false, dts: false, format: 'cjs' };

      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [`defineConfig(${JSON.stringify(properties)})`],
        },
      });

      expect(actual).toEqual({ entry: undefined, properties });
    });
  });
});
