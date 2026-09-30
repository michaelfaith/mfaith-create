import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockPrettierPluginPackageJson: BlockWithoutProps =
  base.createBlock({
    about: {
      name: 'Prettier Plugin Package JSON',
    },
    produce() {
      return {
        addons: [
          blockPrettier({
            plugins: ['prettier-plugin-packagejson'],
          }),
        ],
      };
    },
  });
