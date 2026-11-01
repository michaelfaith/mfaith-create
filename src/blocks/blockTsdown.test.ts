import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test, vi } from 'vitest';

import { blockTsdown } from './blockTsdown.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.ts', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockTsdown, () => {
  test('without props or options', () => {
    const creation = testBlock(blockTsdown, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block ESLint]",
            "props": {
              "ignores": [
                "dist",
              ],
            },
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Gitignore]",
            "props": {
              "ignores": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
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
          },
          {
            "block": "[Block Oxfmt]",
            "props": {
              "ignorePatterns": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block Prettier]",
            "props": {
              "ignores": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block PR Preview Release]",
            "props": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
          },
          {
            "block": "[Block Release Please]",
            "props": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
          },
          {
            "block": "[Block Vitest]",
            "props": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
              "exclude": [
                "dist",
              ],
            },
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig, type UserConfig } from 'tsdown';

      const config: UserConfig = defineConfig({
        "exports": true
      });

      export default config;
      ",
        },
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(blockTsdown, {
      props: {
        additionalConfig: {
          dts: false,
        },
        attw: {
          enabled: 'ci-only',
          profile: 'node16',
          level: 'error',
        },
        entry: ['src/other.ts', './src/other.ts', './src/bin/index.ts'],
        excludeFromExports: ['./src/bin/index.ts'],
        runInCI: ['dist/other.js'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block ESLint]",
            "props": {
              "ignores": [
                "dist",
              ],
            },
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Gitignore]",
            "props": {
              "ignores": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
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
          },
          {
            "block": "[Block Oxfmt]",
            "props": {
              "ignorePatterns": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block Prettier]",
            "props": {
              "ignores": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block PR Preview Release]",
            "props": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
          },
          {
            "block": "[Block Release Please]",
            "props": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
          },
          {
            "block": "[Block Vitest]",
            "props": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
              "exclude": [
                "dist",
              ],
            },
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig, type UserConfig } from 'tsdown';

      const config: UserConfig = defineConfig({
        "attw": {
          "enabled": "ci-only",
          "level": "error",
          "profile": "node16"
        },
        "entry": [
          "src/index.ts",
          "src/other.ts",
          "src/bin/index.ts"
        ],
        "exports": {
          "exclude": [
            "bin/index"
          ]
        },
        "dts": false
      });

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
        "extensions": [
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block ESLint]",
            "props": {
              "ignores": [
                "dist",
              ],
            },
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Gitignore]",
            "props": {
              "ignores": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
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
          },
          {
            "block": "[Block Oxfmt]",
            "props": {
              "ignorePatterns": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block Prettier]",
            "props": {
              "ignores": [
                "/dist",
              ],
            },
          },
          {
            "block": "[Block PR Preview Release]",
            "props": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
          },
          {
            "block": "[Block Release Please]",
            "props": {
              "builders": [
                {
                  "order": 0,
                  "run": "pnpm build",
                },
              ],
            },
          },
          {
            "block": "[Block Vitest]",
            "props": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
              "exclude": [
                "dist",
              ],
            },
          },
          {
            "block": "[Block Remove Dependencies]",
            "props": {
              "dependencies": [
                "@babel/cli",
                "@babel/core",
                "@babel/preset-typescript",
                "babel",
                "tsup",
              ],
            },
          },
          {
            "block": "[Block Remove Files]",
            "props": {
              "files": [
                ".babelrc*",
                "babel.config.*",
                "dist",
                "lib",
                "tsup.config.*",
              ],
            },
          },
          {
            "block": "[Block Remove Workflows]",
            "props": {
              "workflows": [
                "build",
                "tsup",
              ],
            },
          },
        ],
        "files": {
          "tsdown.config.ts": "import { defineConfig, type UserConfig } from 'tsdown';

      const config: UserConfig = defineConfig({
        "exports": true
      });

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

    it('returns the properties when tsdown.config.ts contains other properties', () => {
      const additionalConfig = { clean: false, dts: false, format: 'cjs' };

      const actual = testIntake(blockTsdown, {
        files: {
          'tsdown.config.ts': [`defineConfig(${JSON.stringify(additionalConfig)})`],
        },
      });

      expect(actual).toEqual({
        additionalConfig,
        entry: undefined,
      });
    });
  });
});
