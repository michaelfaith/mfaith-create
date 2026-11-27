import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { removeFiles } from './removeFiles.ts';

export interface RemoveWorkflowsProps {
  workflows?: string[] | undefined;
}

export const removeWorkflows: BlockWithProps<RemoveWorkflowsProps> = base.createBlock({
  about: {
    name: 'Remove Workflows',
  },
  props: {
    workflows: z.array(z.string()).optional(),
  },
  // TODO: Make produce() optional, so this empty-ish produce() can be removed
  // https://github.com/JoshuaKGoldberg/bingo/issues/295
  produce() {
    return {};
  },
  transition({ props }) {
    const { workflows } = props;

    return {
      extensions: [
        removeFiles({
          files: workflows?.map((workflow) => `.github/workflows/${workflow}.{yaml,yml}`),
        }),
      ],
    };
  },
});
