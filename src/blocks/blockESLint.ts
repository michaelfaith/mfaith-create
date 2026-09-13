// @ts-expect-error -- https://github.com/egoist/parse-package-name/issues/30
import { parse as parsePackageName } from 'parse-package-name';
import sortKeys from 'sort-keys';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockGitHubActionsCI } from './blockGitHubActionsCI.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVSCode } from './blockVSCode.ts';
import { blockESLintIntake } from './eslint/blockESLintIntake.ts';
import { JS_TS_FILES } from './eslint/globs.ts';
import { mergeAllExtensions } from './eslint/mergeAllExtensions.ts';
import {
  type Extension,
  type ExtensionRuleGroup,
  type ExtensionRules,
  zExtension,
  zPackageImport,
  type ExtensionPlugins,
} from './eslint/schemas.ts';
import { intakeFile } from './intake/intakeFile.ts';
import { CommandPhase } from './phases.ts';

export const blockESLint = base.createBlock({
  about: {
    name: 'ESLint',
  },
  addons: {
    beforeLint: z.string().optional(),
    explanations: z.array(z.string()).default([]),
    extensions: z.array(zExtension).default([]),
    ignores: z.array(z.string()).default([]),
    imports: z.array(zPackageImport).default([]),
  },
  intake({ files }) {
    const eslintConfigRaw = intakeFile(files, [
      [
        'eslint.config.ts',
        'eslint.config.mts',
        'eslint.config.js',
        'eslint.config.mjs',
      ],
    ]);

    return eslintConfigRaw ? blockESLintIntake(eslintConfigRaw[0]) : undefined;
  },
  produce({ addons }) {
    const { explanations, extensions, ignores, imports } = addons;

    const explanation =
      explanations.length > 0
        ? `${explanations
            .map((explanation) => `/*\n${explanation}\n*/\n`)
            .join('')}\n`
        : '';

    const importLines = [
      "import eslint from '@eslint/js';",
      "import { defineConfig, globalIgnores } from 'eslint/config';",
      "import perfectionist from 'eslint-plugin-perfectionist';",
      "import tseslint from 'typescript-eslint';",
      ...imports.map(
        (packageImport) =>
          `import ${packageImport.specifier} from '${typeof packageImport.source === 'string' ? packageImport.source : packageImport.source.packageName}';`,
      ),
    ].sort((a, b) =>
      a.replace(/.+from/, '').localeCompare(b.replace(/.+from/, '')),
    );

    const ignoreLines = Array.from(
      new Set(
        ['node_modules', 'pnpm-lock.yaml', ...ignores].map((ignore) =>
          JSON.stringify(ignore),
        ),
      ),
    ).sort();

    const extensionEntries = mergeAllExtensions(
      {
        extends: [
          'eslint.configs.recommended',
          'tseslint.configs.strictTypeChecked',
          'tseslint.configs.stylisticTypeChecked',
        ],
        files: JS_TS_FILES,
        languageOptions: {
          parserOptions: {
            projectService: {
              allowDefaultProject: Array.from(
                new Set(['*.config.*s'].filter(Boolean).sort()),
              ),
            },
          },
        },
        plugins: {
          perfectionist: 'perfectionist',
        },
        rules: {
          'perfectionist/sort-exports': 'error',
          'perfectionist/sort-imports': 'error',
        },
        settings: {
          perfectionist: { partitionByComment: true, type: 'natural' },
        },
      },
      ...extensions,
    );

    const coreConfigLines = extensionEntries
      .sort((a, b) =>
        processForSort(a.files).localeCompare(processForSort(b.files)),
      )
      .map(printExtension);

    return {
      addons: [
        blockDevelopmentDocs({
          sections: {
            Linting: {
              contents: {
                after: [
                  `
For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

\`\`\`shell
pnpm run lint --fix
\`\`\`
`,
                  ...(addons.beforeLint ? [addons.beforeLint] : []),
                ],
                before: `
This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:
`,
                items: [
                  `- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints source files, including JavaScript, Markdown, and TypeScript`,
                ],
                plural: `Read the individual documentation for each linter to understand how it can be configured and used best.`,
              },
            },
          },
        }),
        blockGitHubActionsCI({
          jobs: [
            {
              name: 'Lint',
              steps: [{ run: 'pnpm lint' }],
            },
          ],
        }),
        blockPackageJson({
          properties: {
            devDependencies: {
              ...getPackageDependencies(
                '@eslint/js',
                '@types/node',
                'eslint',
                'eslint-plugin-perfectionist',
                'jiti',
                'typescript-eslint',
                ...imports
                  .filter((imported) => typeof imported.source === 'string')
                  .flatMap(({ source, types }) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- https://github.com/egoist/parse-package-name/issues/30
                    const { name } = parsePackageName(source) as {
                      name: string;
                    };
                    return types ? [name, `@types/${name}`] : [name];
                  }),
              ),
              ...Object.fromEntries(
                imports
                  .filter(
                    (
                      imported,
                    ): imported is typeof imported & { source: object } =>
                      typeof imported.source === 'object',
                  )
                  .map((imported) => [
                    imported.source.packageName,
                    imported.source.version,
                  ]),
              ),
            },
            scripts: {
              lint: 'eslint . --max-warnings 0',
            },
          },
        }),
        blockVSCode({
          extensions: ['dbaeumer.vscode-eslint'],
          settings: {
            'eslint.probe': [
              'javascript',
              'javascriptreact',
              'json',
              'jsonc',
              'markdown',
              'typescript',
              'typescriptreact',
              'yaml',
            ],
          },
        }),
      ],
      files: {
        'eslint.config.ts': `${explanation}${importLines.join('\n')}

export default defineConfig(
	globalIgnores( [${ignoreLines.join(', ')}], 'Global Ignores' ),
	{ linterOptions: { reportUnusedDisableDirectives: 'error' } },
	${coreConfigLines.join(',')}
);`,
      },
      scripts: [
        {
          commands: ['pnpm lint --fix'],
          phase: CommandPhase.Process,
        },
      ],
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveDependencies({
          dependencies: [
            '@types/eslint',
            '@typescript-eslint/eslint-plugin',
            '@typescript-eslint/parser',
            'eslint-plugin-deprecation',
            'eslint-plugin-eslint-comments',
            'eslint-plugin-no-only-tests',
            'yaml-eslint-parser',
          ],
        }),
        blockRemoveFiles({
          files: ['.eslintrc*', '.eslintignore', 'eslint.config.{cjs,js,mjs}'],
        }),
        blockRemoveWorkflows({
          workflows: ['eslint', 'lint'],
        }),
      ],
    };
  },
});

function groupByComment(rulesGroups: ExtensionRuleGroup[]) {
  const byComment = new Map<string | undefined, ExtensionRuleGroup>();
  const grouped: typeof rulesGroups = [];

  for (const group of rulesGroups) {
    const existing = byComment.get(group.comment);

    if (existing) {
      existing.entries = {
        ...existing.entries,
        ...group.entries,
      };
      continue;
    } else {
      byComment.set(group.comment, group);
      grouped.push(group);
    }
  }

  return grouped;
}

function printExtension(extension: Extension): string {
  return [
    '{',
    extension.extends && `extends: [${extension.extends.join(', ')}],`,
    `files: [${extension.files.map((glob) => JSON.stringify(glob)).join(', ')}],`,
    extension.languageOptions &&
      `languageOptions: ${JSON.stringify(extension.languageOptions).replace('"import.meta.dirname"', 'import.meta.dirname')},`,
    extension.linterOptions &&
      `linterOptions: ${JSON.stringify(extension.linterOptions)}`,
    extension.plugins && `plugins: ${printPlugins(extension.plugins)},`,
    extension.rules && `rules: ${printExtensionRules(extension.rules)},`,
    extension.settings &&
      `settings: ${JSON.stringify(sortKeys(extension.settings))},`,
    '}',
  ]
    .filter(Boolean)
    .join(' ');
}

function printExtensionRules(rules: ExtensionRules): string {
  if (!Array.isArray(rules)) {
    return JSON.stringify(rules);
  }

  return [
    '{',
    ...groupByComment(rules).flatMap((group) => [
      printGroupComment(group.comment),
      ...Object.entries(group.entries).map(
        ([ruleName, options]) => `'${ruleName}': ${JSON.stringify(options)},`,
      ),
    ]),
    '}',
  ].join('');
}

function printGroupComment(comment: string | undefined): string {
  return comment ? `\n\n// ${comment.replaceAll('\n', '\n// ')}\n` : '';
}

function printPlugins(plugins: ExtensionPlugins): string {
  const lines = ['{'];
  for (const [pluginName, pluginSpecifier] of Object.entries(plugins)) {
    if (pluginName === pluginSpecifier) {
      lines.push(`${pluginName},`);
    } else if (doesKeyNeedQuotes(pluginName)) {
      lines.push(`'${pluginName}': ${pluginSpecifier},`);
    } else {
      lines.push(`${pluginName}: ${pluginSpecifier},`);
    }
  }

  lines.push('}');
  return lines.join('');
}

const noQuotesRequiredRegex = /^[A-Z_$][\w$]*$/i;

const doesKeyNeedQuotes = (key: string) => !noQuotesRequiredRegex.test(key);

function processForSort(files: string[]) {
  return files.join('').replaceAll('{', '');
}
