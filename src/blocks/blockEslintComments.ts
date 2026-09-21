import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintComments = base.createBlock({
  about: {
    name: 'ESLint Comments Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
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
