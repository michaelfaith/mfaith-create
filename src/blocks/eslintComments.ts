import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const eslintComments: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint Comments Plugin',
  },
  produce() {
    return {
      extensions: [
        eslint({
          extensions: [
            {
              extends: ['comments.recommended'],
              files: JS_TS_FILES,
            },
          ],
          imports: [
            {
              source: '@eslint-community/eslint-plugin-eslint-comments/configs',
              specifier: 'comments',
            },
          ],
        }),
      ],
    };
  },
});
