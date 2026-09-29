import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockNvmrc: BlockWithoutAddons<Options> = base.createBlock({
  about: {
    name: 'Nvmrc',
  },
  produce({ options }) {
    return {
      addons: [
        blockPrettier({
          overrides: [{ files: '.nvmrc', options: { parser: 'yaml' } }],
        }),
      ],
      ...(options.node.pinned && {
        files: {
          '.nvmrc': `${options.node.pinned}\n`,
        },
      }),
    };
  },
});
