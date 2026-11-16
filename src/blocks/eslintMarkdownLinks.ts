import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';

export const eslintMarkdownLinks: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint Markdown Links Plugin',
  },
  produce() {
    return {
      extensions: [
        eslint({
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
