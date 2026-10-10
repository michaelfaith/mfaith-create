import { z } from 'zod';

import { base } from '../base.ts';
import { resolveBin } from '../utils/resolveBin.ts';
import type { BlockWithProps } from './Block.ts';
import { CommandPhase } from './phases.ts';

export interface BlockRemoveDependenciesProps {
  dependencies?: string[] | undefined;
}

export const blockRemoveDependencies: BlockWithProps<BlockRemoveDependenciesProps> =
  base.createBlock({
    about: {
      name: 'Remove Dependencies',
    },
    props: {
      dependencies: z.array(z.string()).optional(),
    },
    // TODO: Make produce() optional, so this empty-ish produce() can be removed
    // https://github.com/JoshuaKGoldberg/bingo/issues/295
    produce() {
      return {};
    },
    transition({ props }) {
      return {
        scripts: props.dependencies
          ? [
              {
                commands: [
                  `node ${resolveBin('remove-dependencies')} ${props.dependencies.join(' ')}`,
                ],
                phase: CommandPhase.Process,
              },
            ]
          : undefined,
      };
    },
  });
