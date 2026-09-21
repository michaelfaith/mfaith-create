import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintRegexp = base.createBlock({
  about: {
    name: 'ESLint Regexp Plugin',
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
