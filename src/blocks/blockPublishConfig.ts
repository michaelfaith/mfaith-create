import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { type Bin, binSchema } from './packageJson/schemas.ts';

export interface BlockPublishConfigProps {
  access?: 'public' | 'restricted' | undefined;
  bin?: Bin | undefined;
  exports?: Record<string, unknown> | undefined;
}

export const blockPublishConfig: BlockWithProps<BlockPublishConfigProps> =
  base.createBlock({
    about: {
      name: 'Publish Config',
      description: 'Creates the publishConfig property on the package.json',
    },
    addons: {
      access: z
        .union([z.literal('public'), z.literal('restricted')])
        .optional(),
      bin: binSchema.optional(),
      exports: z.record(z.string(), z.unknown()).optional(),
    },
    produce({ addons }) {
      const { access, bin, exports } = addons;

      if (!access && !exports && !bin) {
        return {};
      }

      return {
        addons: [
          blockPackageJson({
            properties: {
              publishConfig: {
                access,
                bin,
                exports,
              },
            },
          }),
        ],
      };
    },
  });
