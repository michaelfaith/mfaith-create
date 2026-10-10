import { z } from 'zod';

import { base } from '../base.ts';
import { makeRelativePath } from '../utils/makeRelativePath.ts';
import type { BlockWithProps } from './Block.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPublishConfig } from './blockPublishConfig.ts';

export interface BlockExportsProps {
  filePath?: string;
  srcFilePath?: string;
}

export const blockExports: BlockWithProps<BlockExportsProps> = base.createBlock({
  about: {
    name: 'Exports',
  },
  props: {
    filePath: z.string().default('./dist/index.mjs'),
    srcFilePath: z.string().default('./src/index.ts'),
  },
  produce({ options, props }) {
    const { filePath, srcFilePath } = props;
    const { devExports } = options;

    const exportFilePath = devExports ? srcFilePath : filePath;
    const publishConfigExportFilePath = devExports ? filePath : undefined;

    return {
      extensions: [
        blockPackageJson({
          properties: {
            exports: {
              '.': makeRelativePath(exportFilePath),
              './package.json': './package.json',
            },
          },
        }),
        ...(publishConfigExportFilePath
          ? [
              blockPublishConfig({
                exports: {
                  '.': makeRelativePath(publishConfigExportFilePath),
                  './package.json': './package.json',
                },
              }),
            ]
          : []),
      ],
    };
  },
});
