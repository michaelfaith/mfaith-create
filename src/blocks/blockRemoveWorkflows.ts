import type { BlockWithAddons } from 'bingo-stratum';
import { z } from 'zod';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';

export interface BlockRemoveWorkflowsProps {
  workflows?: string[] | undefined;
}

export const blockRemoveWorkflows: BlockWithAddons<
  BlockRemoveWorkflowsProps,
  Options
> = base.createBlock({
  about: {
    name: 'Remove Workflows',
  },
  addons: {
    workflows: z.array(z.string()).optional(),
  },
  // TODO: Make produce() optional, so this empty-ish produce() can be removed
  // https://github.com/JoshuaKGoldberg/bingo/issues/295
  produce() {
    return {};
  },
  transition({ addons }) {
    const { workflows } = addons;

    return {
      addons: [
        blockRemoveFiles({
          files: workflows?.map(
            (workflow) => `.github/workflows/${workflow}.{yaml,yml}`,
          ),
        }),
      ],
    };
  },
});
