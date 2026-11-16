import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { prettier } from './prettier.ts';

export const prettierPluginSentencesPerLine: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Prettier Plugin Sentences Per Line',
  },
  produce() {
    return {
      extensions: [
        prettier({
          plugins: ['prettier-plugin-sentences-per-line'],
        }),
      ],
    };
  },
});
