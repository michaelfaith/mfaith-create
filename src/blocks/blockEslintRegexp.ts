import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintRegexp: BlockWithoutAddons<Options> = base.createBlock({
  about: {
    name: 'ESLint RegExp Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
          extensions: [
            {
              extends: [`regexp.configs['flat/recommended']`],
              files: JS_TS_FILES,
            },
          ],
          imports: [
            { source: 'eslint-plugin-regexp', specifier: '* as regexp' },
          ],
        }),
      ],
    };
  },
});
