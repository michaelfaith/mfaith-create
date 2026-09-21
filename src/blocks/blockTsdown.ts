import removeUndefinedObjects from 'remove-undefined-objects';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
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

const entrySchema = z.array(z.string());
const propertiesSchema = z.record(z.string(), z.unknown());

export const blockTsdown = base.createBlock({
  about: {
    name: 'tsdown',
    description:
      'Set up the project to build with tsdown, including config, scripts, ci job, and more.',
  },
  addons: {
    entry: entrySchema.default([]),
    properties: propertiesSchema.default({}),
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
      properties: removeUndefinedObjects({
        ...propertiesSchema.safeParse(rest).data,
        format: rest.format === 'esm' ? undefined : rest.format,
      }),
    };
  },
  produce({ addons }) {
    const { entry, properties, runInCI } = addons;

    const entries = new Set(['src/index.ts', ...entry]);

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

const config: UserConfig = defineConfig(${JSON.stringify({
          // If `src/index.ts` is the only entry, then omit it.
          entry: entries.size > 1 ? Array.from(entries) : undefined,
          ...properties,
        })});

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
