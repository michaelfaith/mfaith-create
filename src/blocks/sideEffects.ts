import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';
import { packageJson } from './packageJson.ts';

const sideEffectsSchema = z.union([z.boolean(), z.array(z.string())]);

export interface SideEffectsProps {
  sideEffects?: boolean | string[] | undefined;
}

export const sideEffects: BlockWithProps<SideEffectsProps> = base.createBlock({
  about: {
    name: 'Side Effects',
    description: "Adds the `sideEffects` property to the project's package.json.",
  },
  props: {
    sideEffects: sideEffectsSchema.optional(),
  },
  intake({ files }) {
    const { data: sideEffects } = sideEffectsSchema.safeParse(
      intakeFileAsJson(files, ['package.json'])?.sideEffects,
    );

    return sideEffects === undefined ? undefined : { sideEffects };
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
