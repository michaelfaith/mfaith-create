import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { blockPackageJson } from './blockPackageJson.ts';

export interface BlockSideEffectsProps {
  sideEffects?: boolean | string[] | undefined;
}

export const blockSideEffects: BlockWithProps<BlockSideEffectsProps> = base.createBlock({
  about: {
    name: 'Side Effects',
  },
  props: {
    sideEffects: z.union([z.boolean(), z.array(z.string())]).optional(),
  },
  produce({ props }) {
    const { sideEffects = false } = props;

    return {
      extensions: [
        blockPackageJson({
          properties: {
            sideEffects,
          },
        }),
      ],
    };
  },
});
