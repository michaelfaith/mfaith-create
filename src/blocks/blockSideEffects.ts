import type { BlockWithAddons } from 'bingo-stratum';
import { z } from 'zod';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockPackageJson } from './blockPackageJson.ts';

export interface BlockSideEffectsProps {
  sideEffects?: boolean | string[] | undefined;
}

export const blockSideEffects: BlockWithAddons<BlockSideEffectsProps, Options> =
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
