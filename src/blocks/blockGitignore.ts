import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { formatIgnoreFile } from './files/formatIgnoreFile.ts';

export interface BlockGitignoreProps {
  ignores?: string[];
}

export const blockGitignore: BlockWithProps<BlockGitignoreProps> =
  base.createBlock({
    about: {
      name: 'Gitignore',
    },
    addons: {
      ignores: z.array(z.string()).default([]),
    },
    produce({ addons }) {
      const { ignores } = addons;

      return {
        files: {
          '.gitignore': formatIgnoreFile(['/node_modules', ...ignores].sort()),
        },
      };
    },
  });
