import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';

export const blockEslintYml = base.createBlock({
  about: {
    name: 'ESLint YML Plugin',
  },
  produce() {
    return {
      addons: [
        blockEslint({
          extensions: [
            {
              extends: [
                `yml.configs['flat/standard']`,
                `yml.configs['flat/prettier']`,
              ],
              files: ['**/*.{yml,yaml}'],
              rules: {
                'yml/file-extension': 'error',
                'yml/sort-sequence-values': [
                  'error',
                  {
                    order: { type: 'asc' },
                    pathPattern: '^.*$',
                  },
                ],
              },
            },
            {
              files: ['pnpm-workspace.yaml'],
              rules: {
                'yml/sort-keys': [
                  'error',
                  { order: { type: 'asc' }, pathPattern: '^.*$' },
                ],
              },
            },
          ],
          imports: [{ source: 'eslint-plugin-yml', specifier: 'yml' }],
        }),
      ],
    };
  },
});
