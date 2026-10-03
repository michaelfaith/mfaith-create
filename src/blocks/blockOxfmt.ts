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
import { CommandPhase } from './phases.ts';

const overrideSchema: z.ZodType<Override> = z.object({
  files: z.array(z.string()),
  options: z.object({
    parser: z.string(),
  }),
});
export interface Override {
  files: string[];
  options: {
    parser: string;
  };
}

export interface BlockOxfmtProps {
  additionalConfig?: Record<string, unknown> | undefined;
  ignorePatterns?: string[] | undefined;
  overrides?: Override[] | undefined;
}

export const blockOxfmt: BlockWithProps<BlockOxfmtProps> = base.createBlock({
  about: {
    name: 'Oxfmt',
    description: "Sets up Oxfmt as the project's formatter.",
  },
  addons: {
    additionalConfig: z.record(z.string(), z.unknown()).optional(),
    ignorePatterns: z.array(z.string()).default([]),
    overrides: z.array(overrideSchema).default([]),
  },
  produce({ addons }) {
    const { additionalConfig = {}, ignorePatterns, overrides } = addons;

    const oxfmtConfig = 'oxfmt.config.ts';

    return {
      addons: [
        blockCspell({
          ignorePaths: [oxfmtConfig],
        }),
        blockDevelopmentDocs({
          sections: {
            Formatting: {
              contents: `
[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

\`\`\`shell
pnpm format
\`\`\`
`,
            },
          },
        }),
        blockGithubActionsCi({
          jobs: [
            {
              name: 'Format Check',
              steps: [{ run: 'pnpm run format --list-different' }],
            },
          ],
        }),
        blockPackageJson({
          properties: {
            devDependencies: getPackageDependencies(
              'lint-staged',
              'oxfmt',
              'simple-git-hooks',
            ),
            scripts: {
              format: 'oxfmt',
              prepare: 'simple-git-hooks',
            },
            'simple-git-hooks': {
              'pre-commit': 'pnpm lint-staged',
            },
            'lint-staged': {
              '*': 'oxfmt --no-error-on-unmatched-pattern',
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
          extensions: ['oxc.oxc-vscode'],
          settings: { 'editor.defaultFormatter': 'oxc.oxc-vscode' },
        }),
      ],
      files: {
        [oxfmtConfig]: `import { defineConfig, type OxfmtConfig } from 'oxfmt';

const config: OxfmtConfig = defineConfig(${JSON.stringify(
          sortKeys({
            ignorePatterns: ['/pnpm-lock.yaml', ...ignorePatterns].sort(),
            ...(overrides.length && { overrides: overrides.sort() }),
            printWidth: 80,
            singleQuote: true,
            sortImports: true,
            sortPackageJson: false,
            ...additionalConfig,
          }),
        )});

export default config;
`,
      },
      scripts: [
        {
          commands: ['pnpm run format'],
          phase: CommandPhase.Format,
        },
      ],
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveDependencies({
          dependencies: [
            'eslint-config-prettier',
            'eslint-plugin-prettier',
            'prettier',
            'pretty-quick',
          ],
        }),
        blockRemoveFiles({
          files: [
            '.prettierrc',
            '.prettierrc.{c*,js,m*,t*}',
            '.prettierignore',
            'prettier.config*',
          ],
        }),
        blockRemoveWorkflows({
          workflows: ['format', 'prettier'],
        }),
      ],
    };
  },
});
