import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test, vi } from 'vitest';

import { blockTsdown } from './blockTsdown.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.ts', () => ({
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
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "ignores": [
                "dist",
              ],
            },
            "block": "[Block ESLint]",
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
                      "run": "node ./dist/index.mjs",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": "[Block Gitignore]",
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
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": "[Block Prettier]",
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
            "block": "[Block PR Preview Release]",
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
            "block": "[Block Release Please]",
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
            "block": "[Block Vitest]",
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig, type UserConfig } from 'tsdown';

      const config: UserConfig = defineConfig({});

      export default config;
      ",
        },
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockTsdown, {
      addons: {
        devExports: true,
        entry: ['src/other.ts', './src/other.ts'],
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
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "ignores": [
                "dist",
              ],
            },
            "block": "[Block ESLint]",
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
                      "run": "node ./dist/index.mjs",
                    },
                    {
                      "run": "dist/other.js",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": "[Block Gitignore]",
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
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": "[Block Prettier]",
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
            "block": "[Block PR Preview Release]",
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
            "block": "[Block Release Please]",
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
            "block": "[Block Vitest]",
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig, type UserConfig } from 'tsdown';

      const config: UserConfig = defineConfig({"entry":["src/index.ts","src/other.ts"],"dts":false});

      export default config;
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
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "ignores": [
                "dist",
              ],
            },
            "block": "[Block ESLint]",
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
                      "run": "node ./dist/index.mjs",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": "[Block Gitignore]",
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
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "ignores": [
                "/dist",
              ],
            },
            "block": "[Block Prettier]",
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
            "block": "[Block PR Preview Release]",
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
            "block": "[Block Release Please]",
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
            "block": "[Block Vitest]",
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
            "block": "[Block Remove Dependencies]",
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
            "block": "[Block Remove Files]",
          },
          {
            "addons": {
              "workflows": [
                "build",
                "tsup",
              ],
            },
            "block": "[Block Remove Workflows]",
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig, type UserConfig } from 'tsdown';

      const config: UserConfig = defineConfig({});

      export default config;
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

    it('returns devExports when tsdown.config.ts contains exports.devExports: true', () => {
      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [
            `defineConfig(${JSON.stringify({ exports: { devExports: true } })})`,
          ],
        },
      });

      expect(actual).toEqual({ devExports: true });
    });

    it('returns devExports when tsdown.config.ts contains exports.devExports: false', () => {
      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [
            `defineConfig(${JSON.stringify({ exports: { devExports: false } })})`,
          ],
        },
      });

      expect(actual).toEqual({ devExports: false });
    });

    it('returns no devExports when tsdown.config.ts contains exports without devExports', () => {
      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [
            `defineConfig(${JSON.stringify({ exports: true })})`,
          ],
        },
      });

      expect(actual).toEqual({});
    });

    it('returns the properties when tsdown.config.ts contains other properties', () => {
      const properties = { clean: false, dts: false, format: 'cjs' };

      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [`defineConfig(${JSON.stringify(properties)})`],
        },
      });

      expect(actual).toEqual({
        entry: undefined,
        properties,
      });
    });
  });
});
