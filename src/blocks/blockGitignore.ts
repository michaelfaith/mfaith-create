import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { formatTextLines } from './files/formatTextLines.ts';

export interface BlockGitignoreProps {
  ignores?: string[];
}

export const blockGitignore: BlockWithProps<BlockGitignoreProps> = base.createBlock({
  about: {
    name: 'Gitignore',
  },
  props: {
    ignores: z.array(z.string()).default([]),
  },
  produce({ props }) {
    const { ignores } = props;

    return {
      files: {
        '.gitignore': formatTextLines(['/node_modules', ...ignores].sort()),
      },
    };
  },
});
