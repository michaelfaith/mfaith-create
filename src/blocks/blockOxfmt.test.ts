import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { blockOxfmt } from './blockOxfmt.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.ts', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockOxfmt, () => {
  test('without addons or mode', () => {
    const creation = testBlock(blockOxfmt, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "ignorePaths": [
                "oxfmt.config.ts",
              ],
            },
            "block": "[Block CSpell]",
          },
          {
            "addons": {
              "sections": {
                "Formatting": {
                  "contents": "
      [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) is used to format code.
      It should be applied automatically when you save files in VS Code or make a Git commit.

      To manually reformat all files, you can run:

      \`\`\`shell
      pnpm format
      \`\`\`
      ",
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm run format --list-different",
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
                  "lint-staged": "1.2.3",
                  "oxfmt": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "lint-staged": {
                  "*": "oxfmt --no-error-on-unmatched-pattern",
                },
                "scripts": {
                  "format": "oxfmt",
                  "prepare": "simple-git-hooks",
                },
                "simple-git-hooks": {
                  "pre-commit": "pnpm lint-staged",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
            "block": "[Block pnpm Workspace]",
          },
          {
            "addons": {
              "extensions": [
                "oxc.oxc-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "oxc.oxc-vscode",
              },
            },
            "block": "[Block VS Code]",
          },
        ],
        "files": {
          "oxfmt.config.ts": "import { defineConfig, type OxfmtConfig } from 'oxfmt';

      const config: OxfmtConfig = defineConfig({"ignorePatterns":["/pnpm-lock.yaml"],"singleQuote":true,"sortImports":true,"sortPackageJson":false});

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm run format",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockOxfmt, {
      addons: {
        additionalConfig: {
          arrowParens: 'avoid',
        },
        ignorePatterns: ['generated'],
        overrides: [{ files: ['.nvmrc'], options: { parser: 'yaml' } }],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "ignorePaths": [
                "oxfmt.config.ts",
              ],
            },
            "block": "[Block CSpell]",
          },
          {
            "addons": {
              "sections": {
                "Formatting": {
                  "contents": "
      [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) is used to format code.
      It should be applied automatically when you save files in VS Code or make a Git commit.

      To manually reformat all files, you can run:

      \`\`\`shell
      pnpm format
      \`\`\`
      ",
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm run format --list-different",
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
                  "lint-staged": "1.2.3",
                  "oxfmt": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "lint-staged": {
                  "*": "oxfmt --no-error-on-unmatched-pattern",
                },
                "scripts": {
                  "format": "oxfmt",
                  "prepare": "simple-git-hooks",
                },
                "simple-git-hooks": {
                  "pre-commit": "pnpm lint-staged",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
            "block": "[Block pnpm Workspace]",
          },
          {
            "addons": {
              "extensions": [
                "oxc.oxc-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "oxc.oxc-vscode",
              },
            },
            "block": "[Block VS Code]",
          },
        ],
        "files": {
          "oxfmt.config.ts": "import { defineConfig, type OxfmtConfig } from 'oxfmt';

      const config: OxfmtConfig = defineConfig({"arrowParens":"avoid","ignorePatterns":["/pnpm-lock.yaml","generated"],"overrides":[{"files":[".nvmrc"],"options":{"parser":"yaml"}}],"singleQuote":true,"sortImports":true,"sortPackageJson":false});

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm run format",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockOxfmt, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "ignorePaths": [
                "oxfmt.config.ts",
              ],
            },
            "block": "[Block CSpell]",
          },
          {
            "addons": {
              "sections": {
                "Formatting": {
                  "contents": "
      [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) is used to format code.
      It should be applied automatically when you save files in VS Code or make a Git commit.

      To manually reformat all files, you can run:

      \`\`\`shell
      pnpm format
      \`\`\`
      ",
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm run format --list-different",
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
                  "lint-staged": "1.2.3",
                  "oxfmt": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "lint-staged": {
                  "*": "oxfmt --no-error-on-unmatched-pattern",
                },
                "scripts": {
                  "format": "oxfmt",
                  "prepare": "simple-git-hooks",
                },
                "simple-git-hooks": {
                  "pre-commit": "pnpm lint-staged",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
            "block": "[Block pnpm Workspace]",
          },
          {
            "addons": {
              "extensions": [
                "oxc.oxc-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "oxc.oxc-vscode",
              },
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "dependencies": [
                "eslint-config-prettier",
                "eslint-plugin-prettier",
                "prettier",
                "pretty-quick",
              ],
            },
            "block": "[Block Remove Dependencies]",
          },
          {
            "addons": {
              "files": [
                ".prettierrc",
                ".prettierrc.{c*,js,m*,t*}",
                ".prettierignore",
                "prettier.config*",
              ],
            },
            "block": "[Block Remove Files]",
          },
          {
            "addons": {
              "workflows": [
                "format",
                "prettier",
              ],
            },
            "block": "[Block Remove Workflows]",
          },
        ],
        "files": {
          "oxfmt.config.ts": "import { defineConfig, type OxfmtConfig } from 'oxfmt';

      const config: OxfmtConfig = defineConfig({"ignorePatterns":["/pnpm-lock.yaml"],"singleQuote":true,"sortImports":true,"sortPackageJson":false});

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm run format",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });
});
