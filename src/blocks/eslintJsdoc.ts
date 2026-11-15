import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintJsdoc: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint JSDoc Plugin',
  },
  produce() {
    return {
      extensions: [
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
