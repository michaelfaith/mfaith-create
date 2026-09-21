import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const stylisticComment =
  "Stylistic concerns that don't interfere with Prettier";

export const blockEslintMoreStyling = base.createBlock({
  about: {
    name: 'ESLint More Styling',
  },
  produce() {
    return {
      addons: [
        blockEslint({
          extensions: [
            {
              files: JS_TS_FILES,
              rules: [
                {
                  comment: stylisticComment,
                  entries: {
                    'logical-assignment-operators': [
                      'error',
                      'always',
                      { enforceForIfStatements: true },
                    ],
                    'no-useless-rename': 'error',
                    'object-shorthand': 'error',
                    'operator-assignment': 'error',
                  },
                },
              ],
            },
          ],
        }),
      ],
    };
  },
});
