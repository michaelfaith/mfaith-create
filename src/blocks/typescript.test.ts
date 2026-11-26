import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test, vi } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { typescript } from './typescript.ts';

vi.mock('../data/packageData.ts', () => ({
  getPackageDependencies: (...names: string[]) =>
    Object.fromEntries(names.map((name) => [name, '1.2.3'])),
}));

describe(typescript, () => {
  test('without props or options', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block Development Docs]",
            "props": {
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
          },
          {
            "block": "[Block ESLint]",
            "props": {
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
          },
          {
            "block": "[Block Example Files]",
            "props": {
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
          },
          {
            "block": "[Block Gitignore]",
            "props": {
              "ignores": [
                "tsconfig.tsbuildinfo",
              ],
            },
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Knip]",
            "props": {
              "project": [
                "src/**/*.ts",
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "typescript": "1.2.3",
                },
              },
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
            },
          },
          {
            "block": "[Block VS Code]",
            "props": {
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
          },
        ],
        "files": {
          "tsconfig.json": "{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}",
        },
      }
    `);
  });

  test('with props', () => {
    const creation = testBlock(typescript, {
      props: {
        compilerOptions: {
          strictBindCallApply: false,
        },
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
          },
          {
            "block": "[Block ESLint]",
            "props": {
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
          },
          {
            "block": "[Block Example Files]",
            "props": {
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
          },
          {
            "block": "[Block Gitignore]",
            "props": {
              "ignores": [
                "tsconfig.tsbuildinfo",
              ],
            },
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Knip]",
            "props": {
              "project": [
                "src/**/*.ts",
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "typescript": "1.2.3",
                },
              },
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
            },
          },
          {
            "block": "[Block VS Code]",
            "props": {
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
          },
        ],
        "files": {
          "tsconfig.json": "{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"strictBindCallApply":false,"target":"ES2024","types":["node"]},"include":["src"]}",
        },
      }
    `);
  });

  test('with an include prop', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        include: ['scripts', 'src'],
      },
    });

    expect(creation.files?.['tsconfig.json']).toMatchInlineSnapshot(
      `"{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["scripts","src"]}"`,
    );
  });

  test('with an outDir prop', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        outDir: 'lib',
      },
    });

    expect(creation.files?.['tsconfig.json']).toMatchInlineSnapshot(
      `"{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"module":"nodenext","moduleResolution":"nodenext","outDir":"lib","resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"rootDir":"src","skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}"`,
    );
  });

  test('with an exclude prop', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        exclude: ['node_modules', '.next', 'node_modules'],
      },
    });

    expect(creation.files?.['tsconfig.json']).toContain('"exclude":[".next","node_modules"]');
  });

  test('with include, exclude, and plugins props', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        compilerOptions: {
          plugins: [{ name: 'next' }],
        },
        exclude: ['node_modules'],
        include: ['next-env.d.ts'],
      },
    });

    expect(creation.files?.['tsconfig.json']).toMatchInlineSnapshot(
      `"{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"plugins":[{"name":"next"}],"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["next-env.d.ts","src"],"exclude":["node_modules"]}"`,
    );
  });

  test('with existingCompilerOptions overridden by compilerOptions', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        compilerOptions: {
          moduleResolution: 'bundler',
        },
        existingCompilerOptions: {
          jsx: 'preserve',
          moduleResolution: 'node',
        },
      },
    });

    expect(creation.files?.['tsconfig.json']).toMatchInlineSnapshot(
      `"{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"jsx":"preserve","module":"nodenext","moduleResolution":"bundler","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}"`,
    );
  });

  test('with existingCompilerOptions arrays merged with compilerOptions arrays', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        compilerOptions: {
          lib: ['dom', 'esnext'],
          plugins: [{ name: 'next' }],
        },
        existingCompilerOptions: {
          lib: ['esnext', 'webworker'],
          plugins: [{ name: 'next' }, { name: 'typescript-plugin-css-modules' }],
        },
      },
    });

    expect(creation.files?.['tsconfig.json']).toMatchInlineSnapshot(
      `"{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"lib":["esnext","webworker","dom"],"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"plugins":[{"name":"next"},{"name":"typescript-plugin-css-modules"}],"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}"`,
    );
  });

  test('with existingCompilerOptions lib that differs from compilerOptions lib only by case', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        compilerOptions: {
          lib: ['dom', 'dom.iterable', 'esnext'],
        },
        existingCompilerOptions: {
          lib: ['DOM', 'ESNext', 'WebWorker'],
        },
      },
    });

    expect(JSON.parse(creation.files?.['tsconfig.json'] as string)).toMatchObject({
      compilerOptions: {
        lib: ['DOM', 'ESNext', 'WebWorker', 'dom.iterable'],
      },
    });
  });

  test('with existingCompilerOptions objects merged with compilerOptions objects', () => {
    const creation = testBlock(typescript, {
      options: optionsBase,
      props: {
        compilerOptions: {
          jsx: undefined,
          paths: { 'b/*': ['./b/*'] },
        },
        existingCompilerOptions: {
          jsx: 'preserve',
          paths: { 'a/*': ['./a/*'] },
        },
      },
    });

    expect(creation.files?.['tsconfig.json']).toMatchInlineSnapshot(
      `"{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"jsx":"preserve","module":"nodenext","moduleResolution":"nodenext","noEmit":true,"paths":{"a/*":["./a/*"],"b/*":["./b/*"]},"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}"`,
    );
  });

  test('transition mode', () => {
    const creation = testBlock(typescript, {
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
          },
          {
            "block": "[Block ESLint]",
            "props": {
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
          },
          {
            "block": "[Block Example Files]",
            "props": {
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
          },
          {
            "block": "[Block Gitignore]",
            "props": {
              "ignores": [
                "tsconfig.tsbuildinfo",
              ],
            },
          },
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
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
          },
          {
            "block": "[Block Knip]",
            "props": {
              "project": [
                "src/**/*.ts",
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "properties": {
                "devDependencies": {
                  "typescript": "1.2.3",
                },
              },
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
            },
          },
          {
            "block": "[Block VS Code]",
            "props": {
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
          },
          {
            "block": "[Block Remove Workflows]",
            "props": {
              "workflows": [
                "tsc",
              ],
            },
          },
        ],
        "files": {
          "tsconfig.json": "{"compilerOptions":{"declaration":true,"esModuleInterop":true,"isolatedDeclarations":true,"isolatedModules":true,"module":"nodenext","moduleResolution":"nodenext","noEmit":true,"resolveJsonModule":true,"rewriteRelativeImportExtensions":true,"skipLibCheck":true,"strict":true,"target":"ES2024","types":["node"]},"include":["src"]}",
        },
      }
    `);
  });

  describe('intake', () => {
    it('returns undefined when tsconfig.json does not exist', () => {
      const actual = testIntake(typescript, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when tsconfig.json does not contain truthy data', () => {
      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify(null)],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns undefined when tsconfig.json does not contain compilerOptions', () => {
      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ other: true })],
        },
      });

      expect(actual).toBeUndefined();
    });

    it('returns existingCompilerOptions when tsconfig.json contains compilerOptions', () => {
      const compilerOptions = { module: 'ESNext' };

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ compilerOptions })],
        },
      });

      expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
    });

    it('returns existingCompilerOptions when tsconfig.json contains compilerOptions and other data', () => {
      const compilerOptions = { module: 'ESNext' };

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [
            JSON.stringify({
              compilerOptions,
              other: true,
            }),
          ],
        },
      });

      expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
    });

    it('removes source and declaration map options from existingCompilerOptions', () => {
      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [
            JSON.stringify({
              compilerOptions: {
                declarationMap: true,
                inlineSourceMap: true,
                inlineSources: true,
                module: 'ESNext',
                sourceMap: true,
              },
            }),
          ],
        },
      });

      expect(actual).toEqual({
        existingCompilerOptions: { module: 'ESNext' },
      });
    });

    it('returns existingCompilerOptions including paths when tsconfig.json contains compilerOptions with paths', () => {
      const compilerOptions = {
        paths: { '@/*': ['./src/*'] },
        strict: true,
      };

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ compilerOptions })],
        },
      });

      expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
    });

    it('returns existingCompilerOptions including plugins when tsconfig.json contains compilerOptions with plugins', () => {
      const compilerOptions = {
        module: 'ESNext',
        plugins: [{ name: 'next' }],
      };

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ compilerOptions })],
        },
      });

      expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
    });

    it('returns exclude when tsconfig.json contains exclude', () => {
      const exclude = ['node_modules', 'scripts'];

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ exclude })],
        },
      });

      expect(actual).toEqual({ exclude });
    });

    it('returns include when tsconfig.json contains include', () => {
      const include = ['scripts', 'src'];

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ include })],
        },
      });

      expect(actual).toEqual({ include });
    });

    it('returns compilerOptions and include when tsconfig.json contains both', () => {
      const compilerOptions = { module: 'ESNext' };
      const include = ['scripts', 'src'];

      const actual = testIntake(typescript, {
        files: {
          'tsconfig.json': [JSON.stringify({ compilerOptions, include })],
        },
      });

      expect(actual).toEqual({
        existingCompilerOptions: compilerOptions,
        include,
      });
    });
  });
});
