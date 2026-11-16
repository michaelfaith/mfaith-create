import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';

export const eslintJsonc: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint JSONC Plugin',
  },
  produce() {
    return {
      extensions: [
        eslint({
          extensions: [
            {
              extends: [`jsonc.configs['flat/recommended-with-json']`],
              files: ['**/*.json'],
            },
          ],
          imports: [{ source: 'eslint-plugin-jsonc', specifier: 'jsonc' }],
        }),
      ],
    };
  },
});
