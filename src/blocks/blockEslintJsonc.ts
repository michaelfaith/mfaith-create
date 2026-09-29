import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockEslint } from './blockEslint.ts';

export const blockEslintJsonc: BlockWithoutAddons<Options> = base.createBlock({
  about: {
    name: 'ESLint JSONC Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
          extensions: [
            {
              extends: [`jsonc.configs['flat/recommended-with-json']`],
              files: ['**/*.json'],
            },
          ],
          imports: [{ source: 'eslint-plugin-jsonc', specifier: 'jsonc' }],
        }),
      ],
    };
  },
});
