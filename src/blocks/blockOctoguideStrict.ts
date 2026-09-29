import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockOctoguide } from './blockOctoguide.ts';

export const blockOctoguideStrict: BlockWithoutAddons<Options> =
  base.createBlock({
    about: {
      name: 'OctoGuide Strict',
    },
    produce() {
      return {
        addons: [
          blockOctoguide({
            config: 'strict',
          }),
        ],
      };
    },
  });
