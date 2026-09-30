import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockEslint } from './blockEslint.ts';
import { JS_TS_FILES } from './eslint/globs.ts';

export const blockEslintNode: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint Node Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
          extensions: [
            {
              extends: ['n.configs["flat/recommended"]'],
              files: JS_TS_FILES,
            },
            {
              extends: ['tseslint.configs.disableTypeChecked'],
              files: ['**/*.md/*.ts'],
              rules: { 'n/no-missing-import': 'off' },
            },
            {
              files: ['./eslint.config.ts', './**/*.test.*'],
              rules: {
                'n/no-unsupported-features/node-builtins': 'off',
              },
            },
          ],
          imports: [{ source: 'eslint-plugin-n', specifier: 'n' }],
        }),
      ],
    };
  },
});
