import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test, vi } from 'vitest';

import { blockPrettier } from './blockPrettier.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.ts', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockPrettier, () => {
  test('without props or mode', () => {
    const creation = testBlock(blockPrettier, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block CSpell]",
            "props": {
              "ignorePaths": [
                "prettier.config.ts",
              ],
            },
          },
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "prettier": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "scripts": {
                  "format": "prettier .",
                  "prepare": "simple-git-hooks",
                },
                "simple-git-hooks": {
                  "pre-commit": "pnpm pretty-quick --staged",
                },
              },
            },
          },
          {
            "block": "[Block pnpm Workspace]",
            "props": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
          },
          {
            "block": "[Block VS Code]",
            "props": {
              "extensions": [
                "esbenp.prettier-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
              },
            },
          },
        ],
        "files": {
          ".prettierignore": "/.husky
      /pnpm-lock.yaml
      ",
          "prettier.config.ts": "import type { Config } from 'prettier';

      const config: Config = {"singleQuote":true};

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm run format --write",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(blockPrettier, {
      props: {
        additionalConfig: {
          importOrder: ['<BUILTIN_MODULES>', '', '<THIRD_PARTY_MODULES>', '', '^[.]'],
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
        "extensions": [
          {
            "block": "[Block CSpell]",
            "props": {
              "ignorePaths": [
                "prettier.config.ts",
              ],
            },
          },
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
              "jobs": [
                {
                  "name": "Format Check",
                  "steps": [
                    {
                      "run": "pnpm build || exit 0",
                    },
                    {
                      "run": "pnpm run format --list-different",
                    },
                  ],
                },
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
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
                  "format": "prettier .",
                  "prepare": "simple-git-hooks",
                },
                "simple-git-hooks": {
                  "pre-commit": "pnpm pretty-quick --staged",
                },
              },
            },
          },
          {
            "block": "[Block pnpm Workspace]",
            "props": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
          },
          {
            "block": "[Block VS Code]",
            "props": {
              "extensions": [
                "esbenp.prettier-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
              },
            },
          },
        ],
        "files": {
          ".prettierignore": "/.husky
      /pnpm-lock.yaml
      generated
      ",
          "prettier.config.ts": "import type { Config } from 'prettier';

      const config: Config = {"importOrder":["<BUILTIN_MODULES>","","<THIRD_PARTY_MODULES>","","^[.]"],"importOrderTypeScriptVersion":"6.0.0","overrides":[{"files":".nvmrc","options":{"parser":"yaml"}}],"plugins":["./dist/index.mjs","prettier-plugin-curly","prettier-plugin-packagejson","prettier-plugin-sh"],"singleQuote":true};

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm build || exit 0",
              "pnpm run format --write",
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
        "extensions": [
          {
            "block": "[Block CSpell]",
            "props": {
              "ignorePaths": [
                "prettier.config.ts",
              ],
            },
          },
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "prettier": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
                "scripts": {
                  "format": "prettier .",
                  "prepare": "simple-git-hooks",
                },
                "simple-git-hooks": {
                  "pre-commit": "pnpm pretty-quick --staged",
                },
              },
            },
          },
          {
            "block": "[Block pnpm Workspace]",
            "props": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
          },
          {
            "block": "[Block VS Code]",
            "props": {
              "extensions": [
                "esbenp.prettier-vscode",
              ],
              "settings": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
              },
            },
          },
          {
            "block": "[Block Remove Dependencies]",
            "props": {
              "dependencies": [
                "eslint-config-prettier",
                "eslint-plugin-prettier",
              ],
            },
          },
          {
            "block": "[Block Remove Files]",
            "props": {
              "files": [
                ".prettierrc",
                ".prettierrc.{c*,js,m*,t*}",
                "prettier.config*",
              ],
            },
          },
          {
            "block": "[Block Remove Workflows]",
            "props": {
              "workflows": [
                "format",
                "prettier",
              ],
            },
          },
        ],
        "files": {
          ".prettierignore": "/.husky
      /pnpm-lock.yaml
      ",
          "prettier.config.ts": "import type { Config } from 'prettier';

      const config: Config = {"singleQuote":true};

      export default config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm run format --write",
            ],
            "phase": 4,
          },
        ],
      }
    `);
  });
});
