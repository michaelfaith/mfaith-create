import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { formatYaml } from './files/formatYaml.ts';
import { blockRemoveFiles } from './removeFiles.ts';

export const blockFunding: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Funding',
  },
  produce({ options }) {
    return {
      files: {
        '.github': {
          'FUNDING.yml': options.funding && formatYaml({ github: options.funding }),
        },
      },
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveFiles({
          files: ['.github/FUNDING.yaml'],
        }),
      ],
    };
  },
});
