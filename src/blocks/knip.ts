import removeUndefinedObjects from 'remove-undefined-objects';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import type { BlockWithProps } from './Block.ts';
import { developmentDocs } from './developmentDocs.ts';
import { githubActionsCi } from './githubActionsCi.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';
import { intakeFileExportObject } from './intake/intakeFileExportObject.ts';
import { packageJson } from './packageJson.ts';
import { blockRemoveFiles } from './removeFiles.ts';
import { blockRemoveWorkflows } from './removeWorkflows.ts';
import { vscode } from './vscode.ts';

const stringArraySchema = z.array(z.string());

export interface KnipProps {
  entry?: string[] | undefined;
  ignoreDependencies?: string[] | undefined;
  project?: string[] | undefined;
}

export const knip: BlockWithProps<KnipProps> = base.createBlock({
  about: {
    name: 'Knip',
  },
  props: {
    entry: stringArraySchema.optional(),
    ignoreDependencies: stringArraySchema.optional(),
    project: stringArraySchema.optional(),
  },
  intake({ files }) {
    const knipJson =
      intakeFileExportObject(files, ['knip.config.ts']) ?? intakeFileAsJson(files, ['knip.json']);
    if (!knipJson) {
      return undefined;
    }

    return removeUndefinedObjects({
      entry: stringArraySchema.safeParse(knipJson.entry).data,
      ignoreDependencies: stringArraySchema.safeParse(knipJson.ignoreDependencies).data,
      project: stringArraySchema.safeParse(knipJson.project).data,
    });
  },
  produce({ props }) {
    const { entry, ignoreDependencies, project } = props;
    return {
      extensions: [
        developmentDocs({
          sections: {
            Linting: {
              contents: {
                items: [
                  `- \`pnpm knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports`,
                ],
              },
            },
          },
        }),
        githubActionsCi({
          jobs: [
            {
              name: 'Knip',
              steps: [{ run: 'pnpm knip' }],
            },
          ],
        }),
        packageJson({
          properties: {
            devDependencies: getPackageDependencies('knip'),
          },
        }),
        blockRemoveFiles({
          files: ['.ts-prunerc*'],
        }),
        vscode({
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
      extensions: [
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
