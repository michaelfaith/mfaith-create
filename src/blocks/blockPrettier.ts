import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { sortKeys } from '../utils/sortKeys.ts';
import type { BlockWithProps } from './Block.ts';
import { blockCspell } from './blockCspell.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPnpmWorkspace } from './blockPnpmWorkspace.ts';
import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVscode } from './blockVscode.ts';
import { formatTextLines } from './files/formatTextLines.ts';
import { CommandPhase } from './phases.ts';

const overrideSchema: z.ZodType<Override> = z.object({
  files: z.string(),
  options: z.object({
    parser: z.string(),
  }),
});
export interface Override {
  files: string;
  options: {
    parser: string;
  };
}

export interface BlockPrettierProps {
  ignores?: string[] | undefined;
  overrides?: Override[] | undefined;
  plugins?: string[] | undefined;
  runBefore?: string[] | undefined;
  additionalConfig?: Record<string, unknown> | undefined;
}

export const blockPrettier: BlockWithProps<BlockPrettierProps> = base.createBlock({
  about: {
    name: 'Prettier',
  },
  props: {
    additionalConfig: z.record(z.string(), z.unknown()).optional(),
    ignores: z.array(z.string()).default([]),
    overrides: z.array(overrideSchema).default([]),
    plugins: z.array(z.string()).default([]),
    runBefore: z.array(z.string()).default([]),
  },
  produce({ props }) {
    const { additionalConfig = {}, ignores, overrides, plugins, runBefore } = props;

    return {
      extensions: [
        blockCspell({
          ignorePaths: ['prettier.config.ts'],
        }),
        blockDevelopmentDocs({
          sections: {
            Formatting: {
              contents: `
[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

\`\`\`shell
pnpm format --write
\`\`\`
`,
            },
          },
        }),
        blockGithubActionsCi({
          jobs: [
            {
              name: 'Format Check',
              steps: [
                ...runBefore.map((run) => ({ run })),
                { run: 'pnpm run format --list-different' },
              ],
            },
          ],
        }),
        blockPackageJson({
          properties: {
            devDependencies: getPackageDependencies(
              ...plugins.filter((plugin) => !plugin.startsWith('.')),
              'prettier',
              'pretty-quick',
              'simple-git-hooks',
            ),
            scripts: {
              format: 'prettier .',
              prepare: 'simple-git-hooks',
            },
            'simple-git-hooks': {
              'pre-commit': 'pnpm pretty-quick --staged',
            },
          },
        }),
        blockPnpmWorkspace({
          config: {
            allowBuilds: {
              'simple-git-hooks': true,
            },
          },
        }),
        blockVscode({
          extensions: ['esbenp.prettier-vscode'],
          settings: { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
        }),
      ],
      files: {
        '.prettierignore': formatTextLines(['/.husky', '/pnpm-lock.yaml', ...ignores].sort()),
        'prettier.config.ts': `import type { Config } from 'prettier';

const config: Config = ${JSON.stringify(
          sortKeys({
            ...(overrides.length && { overrides: overrides.sort() }),
            ...(plugins.length && { plugins: plugins.sort() }),
            singleQuote: true,
            ...additionalConfig,
          }),
        )};

export default config;
`,
      },
      scripts: [
        {
          commands: [...runBefore, 'pnpm run format --write'],
          phase: CommandPhase.Format,
        },
      ],
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveDependencies({
          dependencies: ['eslint-config-prettier', 'eslint-plugin-prettier'],
        }),
        blockRemoveFiles({
          files: ['.prettierrc', '.prettierrc.{c*,js,m*,t*}', 'prettier.config*'],
        }),
        blockRemoveWorkflows({
          workflows: ['format', 'prettier'],
        }),
      ],
    };
  },
});
