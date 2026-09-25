import { z } from 'zod';

import { base } from '../base.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPublishConfig } from './blockPublishConfig.ts';

export const blockExports = base.createBlock({
  about: {
    name: 'Exports',
  },
  addons: {
    filePath: z.string().default('./dist/index.mjs'),
    srcFilePath: z.string().default('./src/index.ts'),
  },
  produce({ addons, options }) {
    const { filePath, srcFilePath } = addons;
    const { devExports } = options;

    const exportFilePath = devExports ? srcFilePath : filePath;
    const publishConfigExportFilePath = devExports ? filePath : undefined;

    return {
      addons: [
        blockPackageJson({
          properties: {
            exports: {
              '.': exportFilePath.startsWith('.')
                ? exportFilePath
                : `./${exportFilePath}`,
              './package.json': './package.json',
            },
          },
        }),
        ...(publishConfigExportFilePath
          ? [
              blockPublishConfig({
                exports: {
                  '.': publishConfigExportFilePath.startsWith('.')
                    ? publishConfigExportFilePath
                    : `./${publishConfigExportFilePath}`,
                  './package.json': './package.json',
                },
              }),
            ]
          : []),
      ],
    };
  },
});
