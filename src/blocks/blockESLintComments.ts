import { base } from '../base.ts';
import { blockESLint } from './blockESLint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockESLintComments = base.createBlock({
  about: {
    name: 'ESLint Comments Plugin',
  },
  produce() {
    return {
      addons: [
        blockESLint({
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
