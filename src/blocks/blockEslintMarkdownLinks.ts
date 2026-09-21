import { base } from '../base.ts';
import { blockEslint } from './blockEslint.ts';

export const blockEslintMarkdownLinks = base.createBlock({
  about: {
    name: 'ESLint Markdown Links Plugin',
  },
  produce() {
    return {
      addons: [
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
