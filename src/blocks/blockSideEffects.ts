import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { blockPackageJson } from './blockPackageJson.ts';

export interface BlockSideEffectsProps {
  sideEffects?: boolean | string[] | undefined;
}

export const blockSideEffects: BlockWithProps<BlockSideEffectsProps> =
  base.createBlock({
    about: {
      name: 'Side Effects',
    },
    addons: {
      sideEffects: z.union([z.boolean(), z.array(z.string())]).optional(),
    },
    produce({ addons }) {
      const { sideEffects = false } = addons;

      return {
        addons: [
          blockPackageJson({
            properties: {
              sideEffects,
            },
          }),
        ],
      };
    },
  });
