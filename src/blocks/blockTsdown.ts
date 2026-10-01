import { extname } from 'node:path';

import removeUndefinedObjects from 'remove-undefined-objects';
import { type UserConfig } from 'tsdown';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import type { BlockWithProps } from './Block.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockEslint } from './blockEslint.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';
import { blockGitignore } from './blockGitignore.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPrettier } from './blockPrettier.ts';
import { blockPrPreviewRelease } from './blockPrPreviewRelease.ts';
import { blockReleasePlease } from './blockReleasePlease.ts';
import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVitest } from './blockVitest.ts';
import { intakeFileDefineConfig } from './intake/intakeFileDefineConfig.ts';

const attwSchema: z.ZodType<Attw> = z.union([
  z.boolean(),
  z.object({
    enabled: z
      .union([z.boolean(), z.literal('ci-only'), z.literal('local-only')])
      .optional(),
    level: z.union([z.literal('error'), z.literal('warn')]).optional(),
    profile: z
      .union([z.literal('strict'), z.literal('node16'), z.literal('esm-only')])
      .optional(),
    ignoreRules: z.array(z.string()).optional(),
  }),
]);
type Attw = UserConfig['attw'];

const entrySchema = z.array(z.string());
const additionalConfigSchema = z.record(z.string(), z.unknown());

const relativePathRegex = /^\.\/(.*)$/;
const srcPathRegex = /^\.\/src\/(.+)$/;

const makeExclusion = (input: string): string => {
  return input.replace(srcPathRegex, '$1').replace(extname(input), '');
};

export interface BlockTsdownProps {
  additionalConfig?: Record<string, unknown>;
  attw?: Attw | undefined;
  entry?: string[];
  excludeFromExports?: string[] | undefined;
  runInCI?: string[];
}

export const blockTsdown: BlockWithProps<BlockTsdownProps> = base.createBlock({
  about: {
    name: 'tsdown',
    description:
      'Set up the project to build with tsdown, including config, scripts, ci job, and more.',
  },
  addons: {
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
  produce({ addons, options }) {
    const {
      attw,
      entry,
      excludeFromExports,
      additionalConfig: properties,
      runInCI,
    } = addons;
    const { devExports } = options;

    const primaryEntry = 'src/index.ts';
    const distFilePath = './dist/index.mjs';

    const entries = new Set([
      primaryEntry,
      ...entry.map((filePath) => filePath.replace(relativePathRegex, '$1')),
    ]);
    const exclude =
      excludeFromExports &&
      Array.from(
        new Set(
          excludeFromExports.map((exclusion) => makeExclusion(exclusion)),
        ),
      );

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

    return {
      addons: [
        blockDevelopmentDocs({
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
        blockEslint({
          ignores: ['dist'],
        }),
        blockGithubActionsCi({
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
        blockGitignore({
          ignores: ['/dist'],
        }),
        blockPackageJson({
          properties: {
            devDependencies: getPackageDependencies('tsdown'),
            files: ['dist/'],
            scripts: {
              build: 'tsdown',
            },
          },
        }),
        blockPrettier({
          ignores: ['/dist'],
        }),
        blockPrPreviewRelease({
          builders: [
            {
              order: 0,
              run: 'pnpm build',
            },
          ],
        }),
        blockReleasePlease({
          builders: [
            {
              order: 0,
              run: 'pnpm build',
            },
          ],
        }),
        blockVitest({ coverage: { include: ['src'] }, exclude: ['dist'] }),
      ],
      files: {
        'tsdown.config.ts': `import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig(${JSON.stringify(
          {
            attw,
            // If `src/index.ts` is the only entry, then omit it.
            entry: entries.size > 1 ? Array.from(entries) : undefined,
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
      addons: [
        blockRemoveDependencies({
          dependencies: [
            '@babel/cli',
            '@babel/core',
            '@babel/preset-typescript',
            'babel',
            'tsup',
          ],
        }),
        blockRemoveFiles({
          files: [
            '.babelrc*',
            'babel.config.*',
            'dist',
            'lib',
            'tsup.config.*',
          ],
        }),
        blockRemoveWorkflows({
          workflows: ['build', 'tsup'],
        }),
      ],
    };
  },
});
