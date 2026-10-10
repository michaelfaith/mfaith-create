import { z } from 'zod';

import { base } from '../base.ts';
import { resolveBin } from '../utils/resolveBin.ts';
import type { BlockWithProps } from './Block.ts';
import { CommandPhase } from './phases.ts';

export interface BlockRemoveFiles {
  files?: string[] | undefined;
}

export const blockRemoveFiles: BlockWithProps<BlockRemoveFiles> = base.createBlock({
  about: {
    name: 'Remove Files',
  },
  props: {
    files: z.array(z.string()).optional(),
  },
  // TODO: Make produce() optional, so this empty-ish produce() can be removed
  // https://github.com/JoshuaKGoldberg/bingo/issues/295
  produce() {
    return {};
  },
  transition({ props }) {
    return {
      scripts: props.files
        ? [
            {
              commands: [`node ${resolveBin('trash-cli', 'trash')} ${props.files.join(' ')}`],
              phase: CommandPhase.Migrations,
              silent: true,
            },
          ]
        : undefined,
    };
  },
});
