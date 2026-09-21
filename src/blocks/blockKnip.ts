import removeUndefinedObjects from 'remove-undefined-objects';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockRemoveWorkflows } from './blockRemoveWorkflows.ts';
import { blockVscode } from './blockVscode.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';
import { intakeFileExportObject } from './intake/intakeFileExportObject.ts';

const stringArraySchema = z.array(z.string());

export const blockKnip = base.createBlock({
  about: {
    name: 'Knip',
  },
  addons: {
    entry: stringArraySchema.optional(),
    ignoreDependencies: stringArraySchema.optional(),
    project: stringArraySchema.optional(),
  },
  intake({ files }) {
    const knipJson =
      intakeFileExportObject(files, ['knip.config.ts']) ??
      intakeFileAsJson(files, ['knip.json']);
    if (!knipJson) {
      return undefined;
    }

    return removeUndefinedObjects({
      entry: stringArraySchema.safeParse(knipJson.entry).data,
      ignoreDependencies: stringArraySchema.safeParse(
        knipJson.ignoreDependencies,
      ).data,
      project: stringArraySchema.safeParse(knipJson.project).data,
    });
  },
  produce({ addons }) {
    const { entry, ignoreDependencies, project } = addons;
    return {
      addons: [
        blockDevelopmentDocs({
          sections: {
            Linting: {
              contents: {
                items: [
                  `- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports`,
                ],
              },
            },
          },
        }),
        blockGithubActionsCi({
          jobs: [
            {
              name: 'Lint Knip',
              steps: [{ run: 'pnpm lint:knip' }],
            },
          ],
        }),
        blockPackageJson({
          properties: {
            devDependencies: getPackageDependencies('knip'),
            scripts: {
              'lint:knip': 'knip',
            },
          },
        }),
        blockRemoveFiles({
          files: ['.ts-prunerc*'],
        }),
        blockVscode({
          extensions: ['webpro.vscode-knip'],
        }),
      ],
      files: {
        'knip.config.ts': `import type { KnipConfig } from 'knip';

const config: KnipConfig = ${JSON.stringify({
          entry: entry?.sort(),
          ignoreDependencies,
          ignoreExportsUsedInFile: {
            interface: true,
            type: true,
          },
          project: project?.sort(),
          treatConfigHintsAsErrors: true,
        })};

export default config;
`,
      },
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveFiles({
          files: ['.knip*', 'knip.{c,j,m}*', 'knip.json*'],
        }),
        blockRemoveWorkflows({
          workflows: ['knip', 'lint-knip'],
        }),
      ],
    };
  },
});
