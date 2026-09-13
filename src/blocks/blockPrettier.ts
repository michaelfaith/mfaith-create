import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { blockCSpell } from './blockCSpell.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockESLint } from './blockESLint.ts';
import { blockGitHubActionsCI } from './blockGitHubActionsCI.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPnpmWorkspace } from './blockPnpmWorkspace.ts';
import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVSCode } from './blockVSCode.ts';
import { JS_TS_FILES } from './eslint/globs.ts';
import { formatIgnoreFile } from './files/formatIgnoreFile.ts';
import { CommandPhase } from './phases.ts';

export const blockPrettier = base.createBlock({
  about: {
    name: 'Prettier',
  },
  addons: {
    ignores: z.array(z.string()).default([]),
    overrides: z
      .array(
        z.object({
          files: z.string(),
          options: z.object({
            parser: z.string(),
          }),
        }),
      )
      .default([]),
    plugins: z.array(z.string()).default([]),
    runBefore: z.array(z.string()).default([]),
  },
  produce({ addons }) {
    const { ignores, overrides, plugins, runBefore } = addons;

    const simpleGitHooksConfigFileName = '.simple-git-hooks.js';

    return {
      addons: [
        blockCSpell({
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
        blockESLint({
          extensions: [
            {
              files: JS_TS_FILES,
              languageOptions: {
                parserOptions: {
                  projectService: {
                    allowDefaultProject: [simpleGitHooksConfigFileName],
                  },
                },
              },
            },
          ],
        }),
        blockGitHubActionsCI({
          jobs: [
            {
              name: 'Format Check',
              steps: [
                ...runBefore.map((run) => ({ run })),
                { run: 'pnpm format --list-different' },
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
          },
        }),
        blockPnpmWorkspace({
          config: {
            allowBuilds: {
              'simple-git-hooks': true,
            },
          },
        }),
        blockVSCode({
          extensions: ['esbenp.prettier-vscode'],
          settings: { 'editor.defaultFormatter': 'esbenp.prettier-vscode' },
        }),
      ],
      files: {
        [simpleGitHooksConfigFileName]: `export default {
  'pre-commit': 'pnpm pretty-quick --staged',
};`,
        '.prettierignore': formatIgnoreFile(
          ['/.husky', '/pnpm-lock.yaml', ...ignores].sort(),
        ),
        'prettier.config.ts': `import type { Config } from 'prettier';

export default ${JSON.stringify({
          ...(overrides.length && { overrides: overrides.sort() }),
          ...(plugins.length && { plugins: plugins.sort() }),
          singleQuote: true,
        })} satisfies Config;
`,
      },
      scripts: [
        {
          commands: ['pnpm simple-git-hooks'],
          phase: CommandPhase.Build,
        },
        {
          commands: [...runBefore, 'pnpm format --write'],
          phase: CommandPhase.Format,
        },
      ],
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveDependencies({
          dependencies: ['eslint-config-prettier', 'eslint-plugin-prettier'],
        }),
        blockRemoveFiles({
          files: [
            '.prettierrc',
            '.prettierrc.{c*,js,m*,t*}',
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
