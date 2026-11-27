import { extname } from 'node:path';

import removeUndefinedObjects from 'remove-undefined-objects';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { makeRelativePath } from '../utils/makeRelativePath.ts';
import { srcToDist } from '../utils/srcToDist.ts';
import type { BlockWithProps } from './Block.ts';
import { developmentDocs } from './developmentDocs.ts';
import { eslint } from './eslint.ts';
import { type ExportEntry, type Exports, exports as exportsBlock } from './exports.ts';
import { githubActionsCi } from './githubActionsCi.ts';
import { gitignore } from './gitignore.ts';
import { intakeFileDefineConfig } from './intake/intakeFileDefineConfig.ts';
import { oxfmt } from './oxfmt.ts';
import { packageJson } from './packageJson.ts';
import { prettier } from './prettier.ts';
import { prPreviewRelease } from './prPreviewRelease.ts';
import { releasePlease } from './releasePlease.ts';
import { removeDependencies } from './removeDependencies.ts';
import { removeFiles } from './removeFiles.ts';
import { removeWorkflows } from './removeWorkflows.ts';
import { vitest } from './vitest.ts';

const attwSchema: z.ZodType<Attw> = z.union([
  z.boolean(),
  z.object({
    enabled: z.union([z.boolean(), z.literal('ci-only'), z.literal('local-only')]).optional(),
    level: z.union([z.literal('error'), z.literal('warn')]).optional(),
    profile: z.union([z.literal('strict'), z.literal('node16'), z.literal('esm-only')]).optional(),
    ignoreRules: z.array(z.string()).optional(),
  }),
]);
type Attw =
  | boolean
  | {
      enabled?: boolean | 'ci-only' | 'local-only';
      level?: 'error' | 'warn';
      profile?: 'strict' | 'node16' | 'esm-only';
      ignoreRules?: string[];
    };

const entrySchema = z.array(z.string());
const additionalConfigSchema = z.record(z.string(), z.unknown());

const relativePathRegex = /^\.\/(.*)$/;
const srcPathRegex = /^(?:\.\/)?src\/(.+)$/;

const entryKey = (input: string): string => {
  return input.replace(srcPathRegex, '$1').replace(extname(input), '');
};

/**
 * Given a src file path, create a subpath key for the exports object.
 * `./src/index.ts` should be the default entry point, so we use `.` as the key for that.
 * For any other entry point, we use the subpath as the key, but remove any trailing `/index` if present.
 * e.g. `./src/foo/index.ts` should have a key of `./foo`, and `./src/bar.ts` should have a key of `./bar`.
 */
const createSubpathKey = (filePath: string): string => {
  const subpath = entryKey(filePath);

  return subpath === 'index' ? '.' : `./${subpath.replace('/index', '')}`;
};

const createExportEntry = (filePath: string): ExportEntry => {
  const srcPath = filePath;
  const path = srcToDist(srcPath);

  return { path, srcPath };
};

/**
 * Given a list of entry file paths and a list of files to exclude from exports, create
 * an `Exports` object that we can pass to the Exports block.
 */
const createExportsFromEntries = (entries: string[], exclude: string[] = []): Exports => {
  const filteredEntries = entries.filter((entry) => !exclude.includes(entryKey(entry)));

  const exports = Object.fromEntries(
    filteredEntries.map((entry) => {
      const key = createSubpathKey(entry);
      const exportEntry = createExportEntry(entry);
      return [key, exportEntry];
    }),
  );
  return exports;
};

export interface TsdownProps {
  additionalConfig?: Record<string, unknown>;
  attw?: Attw | undefined;
  entry?: string[];
  excludeFromExports?: string[] | undefined;
  runInCI?: string[];
}

export const tsdown: BlockWithProps<TsdownProps> = base.createBlock({
  about: {
    name: 'tsdown',
    description:
      'Set up the project to build with tsdown, including config, scripts, ci job, and more.',
  },
  props: {
    additionalConfig: additionalConfigSchema.default({}),
    attw: attwSchema.optional(),
    entry: entrySchema.default([]),
    excludeFromExports: entrySchema.optional(),
    runInCI: z.array(z.string()).default([]),
  },
  intake({ files }) {
    const rawData = intakeFileDefineConfig(files, ['tsdown.config.ts']);
    if (!rawData) {
      return undefined;
    }

    const { entry: rawEntry, ...rest } = rawData;

    return {
      entry: entrySchema.safeParse(rawEntry).data,
      additionalConfig: removeUndefinedObjects({
        ...additionalConfigSchema.safeParse(rest).data,
        format: rest.format === 'esm' ? undefined : rest.format,
      }),
    };
  },
  produce({ options, props }) {
    const { attw, entry, excludeFromExports, additionalConfig: properties, runInCI } = props;
    const { devExports } = options;

    const primaryEntry = 'src/index.ts';
    const distFilePath = makeRelativePath(srcToDist(primaryEntry));

    const entries = Array.from(
      new Set([
        primaryEntry,
        ...entry.map((filePath) => filePath.replace(relativePathRegex, '$1')),
      ]),
    );
    const exclude =
      excludeFromExports &&
      Array.from(new Set(excludeFromExports.map((exclusion) => entryKey(exclusion))));

    let exports;
    if (devExports) {
      exports = {
        devExports,
        exclude,
      };
    } else if (exclude) {
      exports = { exclude };
    } else {
      exports = true;
    }

    const packageExports = createExportsFromEntries(entries, exclude);

    return {
      extensions: [
        developmentDocs({
          sections: {
            Building: {
              contents: `
Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`dist/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`dist/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
            },
          },
        }),
        eslint({
          ignores: ['dist'],
        }),
        githubActionsCi({
          jobs: [
            {
              name: 'Build',
              steps: [
                { run: 'pnpm build' },
                { run: `node ${distFilePath}` },
                ...runInCI.map((run) => ({ run })),
              ],
            },
          ],
        }),
        gitignore({
          ignores: ['/dist'],
        }),
        packageJson({
          properties: {
            devDependencies: getPackageDependencies('tsdown'),
            files: ['dist/'],
            scripts: {
              build: 'tsdown',
            },
          },
        }),
        oxfmt({
          ignorePatterns: ['/dist'],
        }),
        prettier({
          ignores: ['/dist'],
        }),
        prPreviewRelease({
          builders: [
            {
              order: 0,
              run: 'pnpm build',
            },
          ],
        }),
        releasePlease({
          builders: [
            {
              order: 0,
              run: 'pnpm build',
            },
          ],
        }),
        exportsBlock({ exports: packageExports }),
        vitest({ coverage: { include: ['src'] }, exclude: ['dist'] }),
      ],
      files: {
        'tsdown.config.ts': `import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig(${JSON.stringify(
          {
            attw,
            // If `src/index.ts` is the only entry, then omit it.
            entry: entries.length > 1 ? entries : undefined,
            exports,
            ...properties,
          },
          null,
          2,
        )});

export default config;
`,
      },
    };
  },
  transition() {
    return {
      extensions: [
        removeDependencies({
          dependencies: ['@babel/cli', '@babel/core', '@babel/preset-typescript', 'babel', 'tsup'],
        }),
        removeFiles({
          files: ['.babelrc*', 'babel.config.*', 'dist', 'lib', 'tsup.config.*'],
        }),
        removeWorkflows({
          workflows: ['build', 'tsup'],
        }),
      ],
    };
  },
});
