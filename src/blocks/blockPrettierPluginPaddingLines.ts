import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockPrettierPluginPaddingLines: BlockWithoutProps =
  base.createBlock({
    about: {
      name: 'Prettier Plugin Padding Lines',
    },
    produce() {
      return {
        addons: [
          blockPrettier({
            plugins: ['prettier-plugin-padding-lines'],
          }),
        ],
      };
    },
  });
