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
            "block": [Function],
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
            "block": [Function],
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
            "block": [Function],
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
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "prettier": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
            "block": [Function],
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
            "block": [Function],
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

      export default {"singleQuote":true} satisfies Config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm simple-git-hooks",
            ],
            "phase": 2,
          },
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
            "block": [Function],
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
            "block": [Function],
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
            "block": [Function],
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
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "prettier": "1.2.3",
                  "pretty-quick": "1.2.3",
                  "simple-git-hooks": "1.2.3",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
            "block": [Function],
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
            "block": [Function],
          },
          {
            "addons": {
              "dependencies": [
                "eslint-config-prettier",
                "eslint-plugin-prettier",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": [
                ".prettierrc",
                ".prettierrc.{c*,js,m*,t*}",
                "prettier.config*",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "workflows": [
                "format",
                "prettier",
              ],
            },
            "block": [Function],
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

      export default {"singleQuote":true} satisfies Config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm simple-git-hooks",
            ],
            "phase": 2,
          },
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
            "block": [Function],
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
            "block": [Function],
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
            "block": [Function],
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
            "block": [Function],
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
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "config": {
                "allowBuilds": {
                  "simple-git-hooks": true,
                },
              },
            },
            "block": [Function],
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
            "block": [Function],
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

      export default {"overrides":[{"files":".nvmrc","options":{"parser":"yaml"}}],"plugins":["./dist/index.mjs","prettier-plugin-curly","prettier-plugin-packagejson","prettier-plugin-sh"],"singleQuote":true} satisfies Config;
      ",
        },
        "scripts": [
          {
            "commands": [
              "pnpm simple-git-hooks",
            ],
            "phase": 2,
          },
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
});
