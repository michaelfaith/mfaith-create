import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { blockPrettier } from './blockPrettier.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.js', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockPrettier, () => {
  test('without addons or mode', () => {
    const creation = testBlock(blockPrettier, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "ignorePaths": [
                "prettier.config.ts",
              ],
            },
            "block": "[Block CSpell]",
          },
          {
            "addons": {
              "sections": {
                "Formatting": {
                  "contents": "
      [Prettier](https://prettier.io) is used to format code.
      It should be applied automatically when you save files in VS Code or make a Git commit.

      To manually reformat all files, you can run:

      \`\`\`shell
      pnpm format --write
      \`\`\`
      ",
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                  "languageOptions": {
                    "parserOptions": {
                      "projectService": {
                        "allowDefaultProject": [
                          ".simple-git-hooks.js",
                        ],
                      },
                    },
                  },
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm format --list-different",
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
                  "prettier": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "scripts": {
                  "prepare": "simple-git-hooks",
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
                "esbenp.prettier-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
              },
            },
            "block": "[Block VS Code]",
          },
        ],
        "files": {
          ".prettierignore": "/.husky
      /pnpm-lock.yaml
      ",
          ".simple-git-hooks.js": "export default {
        'pre-commit': 'pnpm pretty-quick --staged',
      };",
          "prettier.config.ts": "import type { Config } from 'prettier';

      const config: Config = {"singleQuote":true};

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm format --write",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockPrettier, {
      addons: {
        additionalConfig: {
          importOrder: [
            '<BUILTIN_MODULES>',
            '',
            '<THIRD_PARTY_MODULES>',
            '',
            '^[.]',
          ],
          importOrderTypeScriptVersion: '6.0.0',
        },
        ignores: ['generated'],
        overrides: [{ files: '.nvmrc', options: { parser: 'yaml' } }],
        plugins: [
          './dist/index.mjs',
          'prettier-plugin-curly',
          'prettier-plugin-packagejson',
          'prettier-plugin-sh',
        ],
        runBefore: ['pnpm build || exit 0'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "ignorePaths": [
                "prettier.config.ts",
              ],
            },
            "block": "[Block CSpell]",
          },
          {
            "addons": {
              "sections": {
                "Formatting": {
                  "contents": "
      [Prettier](https://prettier.io) is used to format code.
      It should be applied automatically when you save files in VS Code or make a Git commit.

      To manually reformat all files, you can run:

      \`\`\`shell
      pnpm format --write
      \`\`\`
      ",
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                  "languageOptions": {
                    "parserOptions": {
                      "projectService": {
                        "allowDefaultProject": [
                          ".simple-git-hooks.js",
                        ],
                      },
                    },
                  },
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm build || exit 0",
                    },
                    {
                      "run": "pnpm format --list-different",
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
                  "prettier": "1.2.3",
                  "prettier-plugin-curly": "1.2.3",
                  "prettier-plugin-packagejson": "1.2.3",
                  "prettier-plugin-sh": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "scripts": {
                  "prepare": "simple-git-hooks",
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
                "esbenp.prettier-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
              },
            },
            "block": "[Block VS Code]",
          },
        ],
        "files": {
          ".prettierignore": "/.husky
      /pnpm-lock.yaml
      generated
      ",
          ".simple-git-hooks.js": "export default {
        'pre-commit': 'pnpm pretty-quick --staged',
      };",
          "prettier.config.ts": "import type { Config } from 'prettier';

      const config: Config = {"importOrder":["<BUILTIN_MODULES>","","<THIRD_PARTY_MODULES>","","^[.]"],"importOrderTypeScriptVersion":"6.0.0","overrides":[{"files":".nvmrc","options":{"parser":"yaml"}}],"plugins":["./dist/index.mjs","prettier-plugin-curly","prettier-plugin-packagejson","prettier-plugin-sh"],"singleQuote":true};

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm build || exit 0",
              "pnpm format --write",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockPrettier, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "ignorePaths": [
                "prettier.config.ts",
              ],
            },
            "block": "[Block CSpell]",
          },
          {
            "addons": {
              "sections": {
                "Formatting": {
                  "contents": "
      [Prettier](https://prettier.io) is used to format code.
      It should be applied automatically when you save files in VS Code or make a Git commit.

      To manually reformat all files, you can run:

      \`\`\`shell
      pnpm format --write
      \`\`\`
      ",
                },
              },
            },
            "block": "[Block Development Docs]",
          },
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.js",
                    "**/*.ts",
                  ],
                  "languageOptions": {
                    "parserOptions": {
                      "projectService": {
                        "allowDefaultProject": [
                          ".simple-git-hooks.js",
                        ],
                      },
                    },
                  },
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm format --list-different",
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
                  "prettier": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "scripts": {
                  "prepare": "simple-git-hooks",
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
                "esbenp.prettier-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
              },
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "dependencies": [
                "eslint-config-prettier",
                "eslint-plugin-prettier",
              ],
            },
            "block": "[Block Remove Dependencies]",
          },
          {
            "addons": {
              "files": [
                ".prettierrc",
                ".prettierrc.{c*,js,m*,t*}",
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
          ".prettierignore": "/.husky
      /pnpm-lock.yaml
      ",
          ".simple-git-hooks.js": "export default {
        'pre-commit': 'pnpm pretty-quick --staged',
      };",
          "prettier.config.ts": "import type { Config } from 'prettier';

      const config: Config = {"singleQuote":true};

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm format --write",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });
});
