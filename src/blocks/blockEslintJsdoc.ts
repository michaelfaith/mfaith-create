import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintJsdoc = base.createBlock({
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
