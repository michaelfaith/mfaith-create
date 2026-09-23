import { z } from 'zod';

import { base } from '../base.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPublishConfig } from './blockPublishConfig.ts';

export const blockExports = base.createBlock({
  about: {
    name: 'Exports',
  },
  addons: {
    filePath: z.string().optional(),
    srcFilePath: z.string().optional(),
  },
  produce({ addons }) {
    const { filePath = './dist/index.mjs', srcFilePath } = addons;

    const devExports = !!srcFilePath;
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
