import removeUndefinedObjects from 'remove-undefined-objects';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockESLint } from './blockESLint.ts';
import { blockGitHubActionsCI } from './blockGitHubActionsCI.ts';
import { blockGitignore } from './blockGitignore.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPrettier } from './blockPrettier.ts';
import { blockReleasePlease } from './blockReleasePlease.ts';
import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVitest } from './blockVitest.ts';
import { intakeFileDefineConfig } from './intake/intakeFileDefineConfig.ts';

const zEntry = z.array(z.string());
const zProperties = z.record(z.unknown());

export const blockTSDown = base.createBlock({
  about: {
    name: 'TSDown',
    description:
      'Set up the project to build with tsdown, including config, scripts, ci job, and more.',
  },
  addons: {
    entry: zEntry.default([]),
    properties: zProperties.default({}),
    runInCI: z.array(z.string()).default([]),
  },
  intake({ files }) {
    const rawData =
      intakeFileDefineConfig(files, ['tsdown.config.ts']) ??
      intakeFileDefineConfig(files, ['tsup.config.ts']);
    if (!rawData) {
      return undefined;
    }

    const { entry: rawEntry, ...rest } = rawData;

    return {
      entry: zEntry.safeParse(rawEntry).data,
      properties: removeUndefinedObjects({
        ...zProperties.safeParse(rest).data,

        // In case of a tsup.config.ts migrated to tsdown.config.ts
        bundle: undefined,
        clean: rest.clean === false ? false : undefined,
        format: rest.format === 'esm' ? undefined : rest.format,
      }),
    };
  },
  produce({ addons }) {
    const { entry, properties, runInCI } = addons;

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
        blockESLint({
          ignores: ['dist'],
        }),
        blockGitHubActionsCI({
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
        'tsdown.config.ts': `import { defineConfig } from 'tsdown';

export default defineConfig(${JSON.stringify({
          entry: Array.from(
            new Set(['src/**/*.ts', '!src/**/*.test.*', ...entry]),
          ),
          unbundle: true,
          ...properties,
        })});
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
