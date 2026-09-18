import { z } from 'zod';

import { base } from '../base.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockTsdown } from './blockTsdown.ts';

export const blockExports = base.createBlock({
  about: {
    name: 'Exports',
  },
  addons: {
    filePath: z.string().optional(),
    runArgs: z.array(z.string()).default([]),
  },
  produce({ addons }) {
    const { filePath = './dist/index.mjs', runArgs } = addons;

    return {
      addons: [
        blockPackageJson({
          properties: {
            exports: {
              '.': filePath.startsWith('.') ? filePath : `./${filePath}`,
              './package.json': './package.json',
            },
          },
        }),
        blockTsdown({
          runInCI: [
            `node ${filePath}${runArgs.map((arg) => ` ${arg}`).join('')}`,
          ],
        }),
      ],
    };
  },
});
