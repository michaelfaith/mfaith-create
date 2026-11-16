import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const eslintRegexp: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint RegExp Plugin',
  },
  produce() {
    return {
      extensions: [
        eslint({
          extensions: [
            {
              extends: [`regexp.configs['flat/recommended']`],
              files: JS_TS_FILES,
            },
          ],
          imports: [{ source: 'eslint-plugin-regexp', specifier: '* as regexp' }],
        }),
      ],
    };
  },
});
