import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockPrettierPluginPackageJson: BlockWithoutAddons<Options> =
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
