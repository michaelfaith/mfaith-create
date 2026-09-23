import { z } from 'zod';

import { base } from '../base.ts';
import { blockPackageJson } from './blockPackageJson.ts';

export const blockPublishConfig = base.createBlock({
  about: {
    name: 'Publish Config',
    description: 'Creates the publishConfig property on the package.json',
  },
  addons: {
    access: z.union([z.literal('public'), z.literal('restricted')]).optional(),
    exports: z.record(z.string(), z.unknown()).optional(),
  },
  produce({ addons }) {
    const { access, exports } = addons;

    if (!access && !exports) {
      return {};
    }

    return {
      addons: [
        blockPackageJson({
          properties: {
            publishConfig: {
              access,
              exports,
            },
          },
        }),
      ],
    };
  },
});
