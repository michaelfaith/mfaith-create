import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';
import { blockRemoveDependencies } from './removeDependencies.ts';
import { blockRemoveFiles } from './removeFiles.ts';
import { blockRemoveWorkflows } from './removeWorkflows.ts';

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
        blockRemoveDependencies({
          dependencies: ['eslint-plugin-markdown', 'markdownlint', 'markdownlint-cli'],
        }),
        blockRemoveFiles({
          files: ['.markdownlint*', '.markdownlintignore'],
        }),
        blockRemoveWorkflows({
          workflows: ['lint_markdown', 'lint_md'],
        }),
      ],
    };
  },
});
