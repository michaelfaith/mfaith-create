import type { IntakeDirectory } from 'bingo-fs';

import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { getNodeMatrixVersions } from '../utils/getNodeMatrixVersions.ts';
import { blockCspell } from './blockCspell.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockEslint } from './blockEslint.ts';
import { blockExampleFiles } from './blockExampleFiles.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';
import { blockGitignore } from './blockGitignore.ts';
import { blockKnip } from './blockKnip.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPrettier } from './blockPrettier.ts';
import { blockRemoveDependencies } from './blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVscode } from './blockVscode.ts';
import { intakeFileDefineConfig } from './intake/intakeFileDefineConfig.ts';
import { stepSchema, workflowPermissionsSchema } from './workflows/schema.ts';

const coverageSchema = z.object({
  exclude: z.array(z.string()).optional(),
  include: z.array(z.string()).optional(),
});

const environmentSchema = z.string();

const excludeSchema = z.array(z.string());

const testSchema = z
  .object({
    coverage: coverageSchema,
    environment: environmentSchema,
    exclude: excludeSchema,
  })
  .partial();

function intakeFromConfig(files: IntakeDirectory) {
  const rawData = intakeFileDefineConfig(files, ['vitest.config.ts']);
  if (typeof rawData?.test !== 'object') {
    return undefined;
  }

  const parsedData = testSchema.safeParse(rawData.test).data;
  if (!parsedData) {
    return undefined;
  }

  return {
    coverage: parsedData.coverage,
    environment: parsedData.environment,
    exclude: parsedData.exclude,
  };
}

export const blockVitest = base.createBlock({
  about: {
    name: 'Vitest',
  },
  addons: {
    actionSteps: z.array(stepSchema).default([]),
    coverage: coverageSchema.default({}),
    environment: environmentSchema.optional(),
    exclude: excludeSchema.default([]),
    flags: z.array(z.string()).default([]),
    permissions: workflowPermissionsSchema.optional(),
  },
  intake({ files, options }) {
    return {
      ...intakeFromConfig(files),
      flags: options.packageData?.scripts?.test
        ?.match(/^vitest (.+)/)?.[1]
        .split(' '),
    };
  },
  produce({ addons, options }) {
    const { actionSteps, coverage, environment, exclude, permissions } = addons;
    const { node } = options;

    const excludeText = JSON.stringify(
      Array.from(new Set(['node_modules', ...exclude])).sort(),
    );

    const nodeVersions = getNodeMatrixVersions(node.supported);

    return {
      addons: [
        blockCspell({
          ignorePaths: ['coverage'],
        }),
        blockDevelopmentDocs({
          sections: {
            Testing: {
              contents: `
[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

\`\`\`shell
pnpm run test
\`\`\`

Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

\`\`\`shell
pnpm run test --coverage
\`\`\`

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.


		`,
            },
          },
        }),
        blockEslint({
          extensions: [
            {
              extends: ['vitest.configs.recommended'],
              files: ['**/*.test.*'],
              rules: [
                {
                  entries: {
                    '@typescript-eslint/no-unsafe-assignment': 'off',
                    'vitest/prefer-describe-function-title': 'error',
                  },
                },
              ],
              settings: {
                vitest: { typecheck: true },
              },
            },
          ],
          ignores: ['coverage', '**/*.snap'],
          imports: [{ source: '@vitest/eslint-plugin', specifier: 'vitest' }],
        }),
        blockExampleFiles({
          files: {
            'greet.test.ts': `import { describe, expect, it, vi } from 'vitest';

import { greet } from './greet.ts';

const message = 'Yay, testing!';

describe(greet, () => {
	it('logs to the console once when message is provided as a string', () => {
		const logger = vi.spyOn(console, 'log').mockImplementation(() => undefined);

		greet(message);

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(1);
	});

	it('logs to the console once when message is provided as an object', () => {
		const logger = vi.spyOn(console, 'log').mockImplementation(() => undefined);

		greet({ message });

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(1);
	});

	it('logs once when times is not provided in an object', () => {
		const logger = vi.fn();

		greet({ logger, message });

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(1);
	});

	it('logs a specified number of times when times is provided', () => {
		const logger = vi.fn();
		const times = 7;

		greet({ logger, message, times });

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(7);
	});
});
`,
          },
        }),
        blockGitignore({
          ignores: ['/coverage'],
        }),
        blockGithubActionsCi({
          jobs: [
            {
              id: 'test_node',
              name: 'Test (Node.js ${{ matrix.node-version }})',
              strategy: {
                'fail-fast': false,
                matrix: {
                  'node-version': nodeVersions,
                },
              },
              steps: [
                {
                  uses: '$/.github/actions/setup',
                  with: {
                    'node-version': '${{ matrix.node-version }}',
                  },
                },
                { run: 'pnpm test' },
              ],
            },
            {
              id: 'test_os',
              name: 'Test (${{ matrix.os }})',
              'runs-on': '${{ matrix.os }}',
              ...(permissions ? { permissions } : {}),
              strategy: {
                'fail-fast': false,
                matrix: {
                  os: ['macos-latest', 'ubuntu-latest', 'windows-latest'],
                },
              },
              steps: [
                {
                  run: "pnpm test ${{ matrix.os == 'ubuntu-latest' && '--coverage' || '' }}",
                },
                ...actionSteps,
              ],
            },
          ],
        }),
        blockKnip({
          entry: ['src/**/*.test.*'],
        }),
        blockPackageJson({
          properties: {
            devDependencies: getPackageDependencies(
              '@vitest/coverage-v8',
              '@vitest/eslint-plugin',
              'console-fail-test',
              'vitest',
            ),
            scripts: {
              test: `vitest ${addons.flags.join(' ')}`.trim(),
            },
          },
        }),
        blockPrettier({
          ignores: ['/coverage'],
        }),
        blockVscode({
          debuggers: [
            {
              args: ['run', '${relativeFile}'],
              autoAttachChildProcesses: true,
              console: 'integratedTerminal',
              name: 'Debug Current Test File',
              program: '${workspaceRoot}/node_modules/vitest/vitest.mjs',
              request: 'launch',
              skipFiles: ['<node_internals>/**', '**/node_modules/**'],
              smartStep: true,
              type: 'node',
            },
          ],
          extensions: ['vitest.explorer'],
        }),
      ],
      files: {
        'vitest.config.ts': `import { defineConfig, type ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			${
        coverage.exclude?.length
          ? `exclude: ${JSON.stringify(coverage.exclude)},
			`
          : ''
      }include: ${JSON.stringify(coverage.include)},
			reporter: ['html', 'lcov'],
		},${
      environment
        ? `
		environment: '${environment}',`
        : ''
    }
		exclude: [${excludeText.slice(1, excludeText.length - 1)}],
		setupFiles: ['console-fail-test/setup'],
	},
});

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
            '@vitest/coverage-istanbul',
            'eslint-plugin-jest',
            'eslint-plugin-mocha',
            'eslint-plugin-vitest',
            'jest mocha',
          ],
        }),
        blockRemoveFiles({
          files: ['.mocha*', 'jest.config.*', 'vitest.config.{c,j,m}*'],
        }),
        blockRemoveWorkflows({
          workflows: ['test'],
        }),
      ],
    };
  },
});
