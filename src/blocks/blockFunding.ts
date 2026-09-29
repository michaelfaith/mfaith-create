import type { BlockWithoutAddons } from 'bingo-stratum';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { formatYaml } from './files/formatYaml.ts';

export const blockFunding: BlockWithoutAddons<Options> = base.createBlock({
  about: {
    name: 'Funding',
  },
  produce({ options }) {
    return {
      files: {
        '.github': {
          'FUNDING.yaml':
            options.funding && formatYaml({ github: options.funding }),
        },
      },
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveFiles({
          files: ['.github/FUNDING.yml'],
        }),
      ],
    };
  },
});
