import { prepareOptions } from 'bingo';
import { intake, type IntakeDirectory } from 'bingo-fs';
import { producePreset } from 'bingo-stratum';
import { diffCreatedDirectory } from 'bingo-testers';
import { format } from 'oxfmt';
import { expect, test, vi } from 'vitest';

import { blockBin } from './blocks/blockBin.ts';
import { JS_TS_FILES } from './blocks/eslint/globs.ts';
import {
  base,
  type BaseOptions,
  blockAreTheTypesWrong,
  blockCspell,
  blockEslint,
  blockKnip,
  blockPnpmWorkspace,
  blockTemplatedWith,
  blockTypescript,
  presetEverything,
} from './index.ts';

vi.mock('./utils/resolveBin.ts', () => ({
  resolveBin: (bin: string) => `node_modules/${bin}`,
}));

vi.mock('./options/readGitDefaults.ts', async () => {
  const { default: gitUrlParse } = await import('git-url-parse');
  return {
    readGitDefaults: () => gitUrlParse('https://github.com/michaelfaith/mfaith-create'),
  };
});

// Check if running in CI and on Windows ('win32')
const isWindowsCI = Boolean(process.env.CI) && process.platform === 'win32';

const presetIntegration = base.createPreset({
  about: {
    description: 'Preset used for integration tests',
    name: 'Integration',
  },
  blocks: [...presetEverything.blocks, blockBin],
});

// This test checks the Bingo production using options inferred from disk,
// along with some explicit extensions and blocks specified.
// It ensures that result has no differences from the actual files on disk.
//
// If the test fails, it's most likely due to a block being changed without the
// corresponding file(s) on disk also being changed.
// You may need to manually update files on disk to match the block's output.
//
// The next most likely culprit for failures is changing file contents that are
// specified by the extensions mentioned in the producePreset() call below.
// For now, if you change the output on disk, you'll need to manually update here too.
// TODO: Eventually the create engine will be able to infer them:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
//
// For example, if you change blockTypescript's target from "ES2023" to "ES2024",
// you'll also need to update the ./tsconfig.json on disk in the same way.
test(
  'Producing the everything preset matches the files in this repository',
  async () => {
    const actual = (await intake('.', {
      exclude: /node_modules|^\.git$/,
    })) as IntakeDirectory;

    const created = producePreset(presetIntegration, {
      options: (await prepareOptions(base)) as BaseOptions,
      refinements: {
        extensions: [
          blockCspell({
            words: [
              'Anson',
              'TSESTree',
              'apexskier',
              'attw',
              'autorelease',
              'dbaeumer',
              'infile',
              'joshuakgoldberg',
              'mfaith',
              'michaelfaith',
              'mshick',
              'octoguide',
              'stefanzweifel',
              'ts-prunerc',
              'webpro',
            ],
          }),
          blockEslint({
            explanations: [
              `👋 Hi! This ESLint configuration contains a lot more stuff than many repos'!
You can read from it to see all sorts of linting goodness, but don't worry -
it's not something you need to exhaustively understand immediately. 💙

If you're interested in learning more, see the 'getting started' docs on:
- ESLint: https://eslint.org
- typescript-eslint: https://typescript-eslint.io`,
            ],
            extensions: [
              {
                files: JS_TS_FILES,
                rules: [
                  {
                    comment: 'These on-by-default rules work well for this repo',
                    entries: {
                      '@typescript-eslint/prefer-nullish-coalescing': [
                        'error',
                        { ignorePrimitives: true },
                      ],
                      '@typescript-eslint/restrict-template-expressions': [
                        'error',
                        {
                          allowBoolean: true,
                          allowNullish: true,
                          allowNumber: true,
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          }),
          blockKnip({
            ignoreDependencies: [
              'all-contributors-cli',
              'cspell-populate-words',
              'prettier',
              'prettier-plugin-sentences-per-line',
              'pretty-quick',
              'remove-dependencies',
              'trash-cli',
            ],
          }),
          // TEMPORARY: Should not be merged!  This is only needed until https://github.com/bingo-js/bingo/pull/472 is merged and released.
          blockPnpmWorkspace({
            config: {
              patchedDependencies: {
                'bingo-stratum': 'patches/bingo-stratum.patch',
                'bingo-stratum-testers': 'patches/bingo-stratum-testers.patch',
              },
            },
          }),
          // Only needed until our `target` moves up to ES2025 or higher (primarily for RegExp.escape types)
          blockTypescript({
            compilerOptions: {
              lib: ['ES2025'],
            },
          }),
        ],
        blocks: {
          add: [blockAreTheTypesWrong],
          exclude: [blockTemplatedWith],
        },
      },
    });

    const processText = async (text: string, filePath: string) => {
      if (/all-contributorsrc|js|md|ts|yaml/.test(filePath)) {
        const formatResult = await format(filePath, text);
        return formatResult.code;
      }
      return text;
    };

    await expect(
      diffCreatedDirectory(actual, created.files, { processText }),
    ).resolves.toBeUndefined();
  },
  isWindowsCI ? 25_000 : 15_000,
);
