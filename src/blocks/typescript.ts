import { isDeepStrictEqual } from 'node:util';

import sortKeys from 'sort-keys';
import { z } from 'zod';
import { type CompilerOptions, CompilerOptionsSchema } from 'zod-tsconfig';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { isPlainObject } from '../utils/isPlainObject.ts';
import type { BlockWithProps } from './Block.ts';
import { developmentDocs } from './developmentDocs.ts';
import { eslint } from './eslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';
import { blockExampleFiles } from './exampleFiles.ts';
import { githubActionsCi } from './githubActionsCi.ts';
import { gitignore } from './gitignore.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';
import { knip } from './knip.ts';
import { packageJson } from './packageJson.ts';
import { blockRemoveWorkflows } from './removeWorkflows.ts';
import { vitest } from './vitest.ts';
import { vscode } from './vscode.ts';

export interface TypescriptProps {
  compilerOptions?: CompilerOptions | undefined;
  exclude?: string[];
  existingCompilerOptions?: CompilerOptions | undefined;
  include?: string[];
  outDir?: string;
}

export const typescript: BlockWithProps<TypescriptProps> = base.createBlock({
  about: {
    name: 'TypeScript',
  },
  props: {
    compilerOptions: CompilerOptionsSchema.optional(),
    exclude: z.array(z.string()).default([]),
    existingCompilerOptions: CompilerOptionsSchema.optional(),
    include: z.array(z.string()).default([]),
    outDir: z.string().optional(),
  },
  intake({ files }) {
    const raw = intakeFileAsJson(files, ['tsconfig.json']);
    const compilerOptions = withoutMapOptions(
      CompilerOptionsSchema.safeParse(raw?.compilerOptions).data,
    );

    const exclude = z.array(z.string()).safeParse(raw?.exclude).data;
    const include = z.array(z.string()).safeParse(raw?.include).data;
    if (!compilerOptions && !exclude && !include) {
      return undefined;
    }

    return {
      ...(compilerOptions && { existingCompilerOptions: compilerOptions }),
      ...(exclude && { exclude }),
      ...(include && { include }),
    };
  },
  produce({ options, props }) {
    const { compilerOptions, exclude, existingCompilerOptions, include, outDir } = props;

    return {
      extensions: [
        developmentDocs({
          sections: {
            'Type Checking': {
              contents: `
You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

\`\`\`shell
pnpm tsc
\`\`\`

Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

\`\`\`shell
pnpm tsc --watch
\`\`\`
`,
            },
          },
        }),
        eslint({
          extensions: [
            {
              files: JS_TS_FILES,
              rules: {
                '@typescript-eslint/consistent-type-exports': 'error',
                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/explicit-module-boundary-types': 'error',
              },
            },
          ],
        }),
        blockExampleFiles({
          files: {
            'greet.ts': `import type { GreetOptions } from './types.ts';

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
	`,
            'index.ts': `export { greet } from './greet.ts';
export type { GreetOptions } from './types.ts';
`,
            'types.ts': `export interface GreetOptions {
		logger?: (message: string) => void;
		message: string;
		times?: number;
	}
	`,
          },
          usage: [
            `\`\`\`shell
npm i ${options.repository}
\`\`\`
\`\`\`ts
import { greet } from '${options.repository}';

greet('Hello, world! ${options.emoji}');
\`\`\``,
          ],
        }),
        gitignore({
          ignores: ['tsconfig.tsbuildinfo'],
        }),
        githubActionsCi({
          jobs: [{ name: 'Type Check', steps: [{ run: 'pnpm tsc' }] }],
        }),
        knip({
          project: ['src/**/*.ts'],
        }),
        packageJson({
          properties: {
            devDependencies: getPackageDependencies('typescript'),
          },
        }),
        vitest({ coverage: { include: ['src'] } }),
        vscode({
          settings: {
            'js/ts.tsdk.path': 'node_modules/typescript/lib',
          },
          tasks: [
            {
              detail: 'Build the project',
              label: 'build',
              script: 'build',
              type: 'npm',
            },
          ],
        }),
      ],
      files: {
        'tsconfig.json': JSON.stringify({
          compilerOptions: sortKeys({
            declaration: true,
            esModuleInterop: true,
            isolatedDeclarations: true,
            isolatedModules: true,
            module: 'nodenext',
            moduleResolution: 'nodenext',
            noEmit: true,
            resolveJsonModule: true,
            rewriteRelativeImportExtensions: true,
            skipLibCheck: true,
            strict: true,
            target: 'ES2024',
            types: ['node'],
            ...(outDir && { outDir, rootDir: 'src' }),
            ...mergeOptions(existingCompilerOptions, compilerOptions),
            ...(outDir && { noEmit: undefined }),
          }),
          include: Array.from(new Set(['src', ...include])).sort(),
          ...(exclude.length && {
            exclude: Array.from(new Set(exclude)).sort(),
          }),
        }),
      },
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveWorkflows({
          workflows: ['tsc'],
        }),
      ],
    };
  },
});

const isCaseInsensitiveEqual = (a: unknown, b: unknown) => {
  return String(a).toLowerCase() === String(b).toLowerCase();
};

const mergeOptions = (
  ...sources: (Record<string, unknown> | undefined)[]
): Record<string, unknown> => {
  const merged: Record<string, unknown> = {};

  for (const source of sources) {
    for (const [key, value] of Object.entries(source ?? {})) {
      const existing = merged[key];

      if (value === undefined) {
        continue;
      }

      if (Array.isArray(existing) && Array.isArray(value)) {
        const isEqual = key === 'lib' ? isCaseInsensitiveEqual : isDeepStrictEqual;

        merged[key] = [...(existing as unknown[]), ...(value as unknown[])].filter(
          (item, index, all) => all.findIndex((other) => isEqual(item, other)) === index,
        );
      } else if (isPlainObject(existing) && isPlainObject(value)) {
        merged[key] = mergeOptions(existing, value);
      } else {
        merged[key] = value;
      }
    }
  }

  return merged;
};

const mapOptions = new Set(['declarationMap', 'inlineSourceMap', 'inlineSources', 'sourceMap']);

const withoutMapOptions = <T extends object>(compilerOptions: T | undefined): T | undefined => {
  return (
    compilerOptions &&
    (Object.fromEntries(
      Object.entries(compilerOptions).filter(([key]) => !mapOptions.has(key)),
    ) as T)
  );
};
