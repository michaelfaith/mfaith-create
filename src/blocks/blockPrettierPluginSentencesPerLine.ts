import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockPrettierPluginSentencesPerLine: BlockWithoutAddons<Options> =
  base.createBlock({
    about: {
      name: 'Prettier Plugin Sentences Per Line',
    },
    produce() {
      return {
        addons: [
          blockPrettier({
            plugins: ['prettier-plugin-sentences-per-line'],
          }),
        ],
      };
    },
  });
