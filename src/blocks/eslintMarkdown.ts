import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';
import { removeDependencies } from './removeDependencies.ts';
import { removeFiles } from './removeFiles.ts';
import { removeWorkflows } from './removeWorkflows.ts';

export const eslintMarkdown: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint Markdown Plugin',
  },
  produce() {
    return {
      extensions: [
        eslint({
          extensions: [
            {
              extends: ['markdown.configs.recommended'],
              files: ['**/*.md'],
              rules: [
                {
                  comment: 'https://github.com/eslint/markdown/issues/294',
                  entries: {
                    'markdown/no-missing-label-refs': 'off',
                  },
                },
              ],
            },
          ],
          imports: [
            {
              source: '@eslint/markdown',
              specifier: 'markdown',
            },
          ],
        }),
        removeDependencies({
          dependencies: ['eslint-plugin-markdown', 'markdownlint', 'markdownlint-cli'],
        }),
        removeFiles({
          files: ['.markdownlint*', '.markdownlintignore'],
        }),
        removeWorkflows({
          workflows: ['lint_markdown', 'lint_md'],
        }),
      ],
    };
  },
});
