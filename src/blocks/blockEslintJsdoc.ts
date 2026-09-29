import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintJsdoc: BlockWithoutAddons<Options> = base.createBlock({
  about: {
    name: 'ESLint JSDoc Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
          extensions: [
            {
              extends: [
                "jsdoc.configs['flat/contents-typescript-error']",
                "jsdoc.configs['flat/logical-typescript-error']",
                "jsdoc.configs['flat/stylistic-typescript-error']",
              ],
              files: JS_TS_FILES,
            },
          ],
          imports: [{ source: 'eslint-plugin-jsdoc', specifier: 'jsdoc' }],
        }),
      ],
    };
  },
});
