import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockPrettierPluginPaddingLines: BlockWithoutAddons<Options> =
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
