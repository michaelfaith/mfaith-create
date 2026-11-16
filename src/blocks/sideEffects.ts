import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { packageJson } from './packageJson.ts';

export interface SideEffectsProps {
  sideEffects?: boolean | string[] | undefined;
}

export const sideEffects: BlockWithProps<SideEffectsProps> = base.createBlock({
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
        packageJson({
          properties: {
            sideEffects,
          },
        }),
      ],
    };
  },
});
