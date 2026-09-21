import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test, vi } from 'vitest';

import { blockTypeScript } from './blockTypeScript.ts';
import { optionsBase } from './options.fakes.ts';

vi.mock('../data/packageData.js', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(blockTypeScript, () => {
  test('without addons or options', () => {
    const creation = testBlock(blockTypeScript, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Type Checking": {
                  "contents": "
      You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

      However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

      \`\`\`shell
      pnpm tsc
      \`\`\`

      Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

      \`\`\`shell
      pnpm tsc --watch
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
                  "rules": {
                    "@typescript-eslint/consistent-type-exports": "error",
                    "@typescript-eslint/consistent-type-imports": "error",
                    "@typescript-eslint/explicit-module-boundary-types": "error",
                  },
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "files": {
                "greet.ts": "import type { GreetOptions } from './types.ts';

      	export function greet(options: GreetOptions | string): void {
      		const {
      			logger = console.log.bind(console),
      			message,
      			times = 1,
      		} = typeof options === 'string' ? { message: options } : options;

      		for (let i = 0; i < times; i += 1) {
      			logger(message);
      		}
      	}
      	",
                "index.ts": "export { greet } from './greet.ts';
      export type { GreetOptions } from './types.ts';
      ",
                "types.ts": "export interface GreetOptions {
      		logger?: (message: string) => void;
      		message: string;
      		times?: number;
      	}
      	",
              },
              "usage": [
                "\`\`\`shell
      npm i test-repository
      \`\`\`
      \`\`\`ts
      import { greet } from 'test-repository';

      greet('Hello, world! ✨');
      \`\`\`",
              ],
            },
            "block": "[Block Example Files]",
          },
          {
            "addons": {
              "ignores": [
                "tsconfig.tsbuildinfo",
              ],
            },
            "block": "[Block Gitignore]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Type Check",
                  "steps": [
                    {
                      "run": "pnpm tsc",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "project": [
                "src/**/*.ts",
              ],
            },
            "block": "[Block Knip]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "typescript": "1.2.3",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
            },
            "block": "[Block Vitest]",
          },
          {
            "addons": {
              "settings": {
                "js/ts.tsdk.path": "node_modules/typescript/lib",
              },
              "tasks": [
                {
                  "detail": "Build the project",
                  "label": "build",
                  "script": "build",
                  "type": "npm",
                },
              ],
            },
            "block": "[Block VS Code]",
          },
        ],
        "files": {
          "tsconfig.json": "{"compilerOptions":{"declaration":true,"esModuleInterop":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}",
        },
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockTypeScript, {
      addons: {
        compilerOptions: {
          strictBindCallApply: false,
        },
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Type Checking": {
                  "contents": "
      You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

      However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

      \`\`\`shell
      pnpm tsc
      \`\`\`

      Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

      \`\`\`shell
      pnpm tsc --watch
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
                  "rules": {
                    "@typescript-eslint/consistent-type-exports": "error",
                    "@typescript-eslint/consistent-type-imports": "error",
                    "@typescript-eslint/explicit-module-boundary-types": "error",
                  },
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "files": {
                "greet.ts": "import type { GreetOptions } from './types.ts';

      	export function greet(options: GreetOptions | string): void {
      		const {
      			logger = console.log.bind(console),
      			message,
      			times = 1,
      		} = typeof options === 'string' ? { message: options } : options;

      		for (let i = 0; i < times; i += 1) {
      			logger(message);
      		}
      	}
      	",
                "index.ts": "export { greet } from './greet.ts';
      export type { GreetOptions } from './types.ts';
      ",
                "types.ts": "export interface GreetOptions {
      		logger?: (message: string) => void;
      		message: string;
      		times?: number;
      	}
      	",
              },
              "usage": [
                "\`\`\`shell
      npm i test-repository
      \`\`\`
      \`\`\`ts
      import { greet } from 'test-repository';

      greet('Hello, world! ✨');
      \`\`\`",
              ],
            },
            "block": "[Block Example Files]",
          },
          {
            "addons": {
              "ignores": [
                "tsconfig.tsbuildinfo",
              ],
            },
            "block": "[Block Gitignore]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Type Check",
                  "steps": [
                    {
                      "run": "pnpm tsc",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "project": [
                "src/**/*.ts",
              ],
            },
            "block": "[Block Knip]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "typescript": "1.2.3",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
            },
            "block": "[Block Vitest]",
          },
          {
            "addons": {
              "settings": {
                "js/ts.tsdk.path": "node_modules/typescript/lib",
              },
              "tasks": [
                {
                  "detail": "Build the project",
                  "label": "build",
                  "script": "build",
                  "type": "npm",
                },
              ],
            },
            "block": "[Block VS Code]",
          },
        ],
        "files": {
          "tsconfig.json": "{"compilerOptions":{"declaration":true,"esModuleInterop":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"strictBindCallApply":false,"target":"ES2024","types":["node"]},"include":["src"]}",
        },
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockTypeScript, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "sections": {
                "Type Checking": {
                  "contents": "
      You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

      However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

      \`\`\`shell
      pnpm tsc
      \`\`\`

      Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

      \`\`\`shell
      pnpm tsc --watch
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
                  "rules": {
                    "@typescript-eslint/consistent-type-exports": "error",
                    "@typescript-eslint/consistent-type-imports": "error",
                    "@typescript-eslint/explicit-module-boundary-types": "error",
                  },
                },
              ],
            },
            "block": "[Block ESLint]",
          },
          {
            "addons": {
              "files": {
                "greet.ts": "import type { GreetOptions } from './types.ts';

      	export function greet(options: GreetOptions | string): void {
      		const {
      			logger = console.log.bind(console),
      			message,
      			times = 1,
      		} = typeof options === 'string' ? { message: options } : options;

      		for (let i = 0; i < times; i += 1) {
      			logger(message);
      		}
      	}
      	",
                "index.ts": "export { greet } from './greet.ts';
      export type { GreetOptions } from './types.ts';
      ",
                "types.ts": "export interface GreetOptions {
      		logger?: (message: string) => void;
      		message: string;
      		times?: number;
      	}
      	",
              },
              "usage": [
                "\`\`\`shell
      npm i test-repository
      \`\`\`
      \`\`\`ts
      import { greet } from 'test-repository';

      greet('Hello, world! ✨');
      \`\`\`",
              ],
            },
            "block": "[Block Example Files]",
          },
          {
            "addons": {
              "ignores": [
                "tsconfig.tsbuildinfo",
              ],
            },
            "block": "[Block Gitignore]",
          },
          {
            "addons": {
              "jobs": [
                {
                  "name": "Type Check",
                  "steps": [
                    {
                      "run": "pnpm tsc",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
          {
            "addons": {
              "project": [
                "src/**/*.ts",
              ],
            },
            "block": "[Block Knip]",
          },
          {
            "addons": {
              "properties": {
                "devDependencies": {
                  "typescript": "1.2.3",
                },
              },
            },
            "block": "[Block Package JSON]",
          },
          {
            "addons": {
              "coverage": {
                "include": [
                  "src",
                ],
              },
            },
            "block": "[Block Vitest]",
          },
          {
            "addons": {
              "settings": {
                "js/ts.tsdk.path": "node_modules/typescript/lib",
              },
              "tasks": [
                {
                  "detail": "Build the project",
                  "label": "build",
                  "script": "build",
                  "type": "npm",
                },
              ],
            },
            "block": "[Block VS Code]",
          },
          {
            "addons": {
              "workflows": [
                "tsc",
              ],
            },
            "block": "[Block Remove Workflows]",
          },
        ],
        "files": {
          "tsconfig.json": "{"compilerOptions":{"declaration":true,"esModuleInterop":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}",
        },
      }
    `);
  });

  describe('intake', () => {
    it('returns undefined when tsconfig.json does not exist', () => {
      const actual = testIntake(blockTypeScript, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when tsconfig.json does not contain truthy data', () => {
      const actual = testIntake(blockTypeScript, {
        files: {
          'tsconfig.json': [JSON.stringify(null)],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when tsconfig.json does not contain compilerOptions', () => {
      const actual = testIntake(blockTypeScript, {
        files: {
          'tsconfig.json': [JSON.stringify({ other: true })],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns compilerOptions when tsconfig.json contains compilerOptions', () => {
      const compilerOptions = { module: 'ESNext' };

      const actual = testIntake(blockTypeScript, {
        files: {
          'tsconfig.json': [JSON.stringify({ compilerOptions })],
        },
      });

      expect(actual).toEqual({ compilerOptions });
    });

    it('returns compilerOptions when tsconfig.json contains compilerOptions and other data', () => {
      const compilerOptions = { module: 'ESNext' };

      const actual = testIntake(blockTypeScript, {
        files: {
          'tsconfig.json': [
            JSON.stringify({
              compilerOptions,
              other: true,
            }),
          ],
        },
      });

      expect(actual).toEqual({ compilerOptions });
    });
  });
});
