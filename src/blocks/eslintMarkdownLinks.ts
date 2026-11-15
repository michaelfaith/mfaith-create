import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockEslint } from './eslint.ts';

export const blockEslintMarkdownLinks: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint Markdown Links Plugin',
  },
  produce() {
    return {
      extensions: [
        blockEslint({
          extensions: [
            {
              extends: ['markdownLinks.configs.recommended'],
              files: ['**/*.md'],
            },
          ],
          imports: [
            {
              source: 'eslint-plugin-markdown-links',
              specifier: 'markdownLinks',
            },
          ],
        }),
      ],
    };
  },
});
