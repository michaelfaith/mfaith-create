import JSON5 from 'json5';
import { getObjectStringsDeep } from 'object-strings-deep';
import { z } from 'zod';

import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import { resolveBin } from '../utils/resolveBin.ts';
import type { BlockWithProps } from './Block.ts';
import { developmentDocs } from './developmentDocs.ts';
import { githubActionsCi } from './githubActionsCi.ts';
import { intakeFile } from './intake/intakeFile.ts';
import { packageJson } from './packageJson.ts';
import { CommandPhase } from './phases.ts';
import { blockRemoveWorkflows } from './removeWorkflows.ts';
import { vscode } from './vscode.ts';

const filesGlob = `"**" ".github/**/*"`;

const props = {
  ignorePaths: z.array(z.string()).default([]),
  words: z.array(z.string()).default([]),
};
const propsSchema: z.ZodType<CspellProps> = z.object(props);

export interface CspellProps {
  ignorePaths?: string[];
  words?: string[];
}

export const cspell: BlockWithProps<CspellProps> = base.createBlock({
  about: {
    name: 'CSpell',
  },
  props,
  intake({ files }) {
    const cspellJson = intakeFile(files, ['cspell.json']);
    if (!cspellJson) {
      return undefined;
    }

    const { data } = propsSchema.safeParse(JSON5.parse<unknown>(cspellJson[0]));
    if (!data) {
      return undefined;
    }

    return data;
  },
  produce({ options, props }) {
    const { ignorePaths, words } = props;

    const allWords = Array.from(new Set([...(options.words ?? []), ...words])).sort();

    return {
      extensions: [
        developmentDocs({
          sections: {
            Linting: {
              contents: {
                items: [
                  `- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files`,
                ],
              },
            },
          },
        }),
        vscode({
          extensions: ['streetsidesoftware.code-spell-checker'],
        }),
        githubActionsCi({
          jobs: [
            {
              name: 'Lint Spelling',
              steps: [{ run: 'pnpm lint:spelling' }],
            },
          ],
        }),
        packageJson({
          properties: {
            devDependencies: getPackageDependencies('cspell'),
            scripts: {
              'lint:spelling': `cspell ${filesGlob}`,
            },
          },
        }),
      ],
      files: {
        'cspell.json': JSON.stringify({
          dictionaries: ['npm', 'node', 'typescript'],
          ignorePaths: Array.from(
            new Set([
              '.github',
              'CHANGELOG.md',
              'dist',
              'node_modules',
              'package.json',
              'patches',
              'pnpm-lock.yaml',
              ...ignorePaths,
            ]),
          ).sort(),
          ...(allWords.length && { words: allWords }),
        }),
      },
    };
  },
  setup({ options }) {
    const wordArgs = getObjectStringsDeep(options)
      .map((word) => `--words "${word.replaceAll(`"`, ' ')}"`)
      .join(' ');

    return {
      scripts: [
        {
          commands: [`node ${resolveBin('cspell-populate-words')} ${wordArgs}`],
          phase: CommandPhase.Process,
        },
      ],
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveWorkflows({
          workflows: ['lint-spelling', 'spelling'],
        }),
      ],
    };
  },
});
