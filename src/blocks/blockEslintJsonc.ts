import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';

export const blockEslintJsonc = base.createBlock({
  about: {
    name: 'ESLint JSONC Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
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
