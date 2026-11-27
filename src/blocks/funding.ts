import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { formatYaml } from './files/formatYaml.ts';
import { removeFiles } from './removeFiles.ts';

export const funding: BlockWithoutProps = base.createBlock({
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
        removeFiles({
          files: ['.github/FUNDING.yaml'],
        }),
      ],
    };
  },
});
