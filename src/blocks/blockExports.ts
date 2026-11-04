import { z } from 'zod';

import { base } from '../base.ts';
import { makeRelativePath } from '../utils/makeRelativePath.ts';
import type { BlockWithProps } from './Block.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPublishConfig } from './blockPublishConfig.ts';

const exportEntrySchema: z.ZodType<ExportEntry> = z.object({
  path: z.string(),
  srcPath: z.string().optional(),
});
const exportsSchema: z.ZodType<Exports> = z.record(z.string(), exportEntrySchema);

export interface ExportEntry {
  path: string;
  srcPath?: string | undefined;
}
export type Exports = Record<string, ExportEntry>;
export interface BlockExportsProps {
  exports?: Exports | undefined;
}

const createExportEntries = (exports: Exports, isSrcExports: boolean): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(exports).map(([key, value]) => {
      const filePath = isSrcExports && value.srcPath ? value.srcPath : value.path;
      return [key, makeRelativePath(filePath)];
    }),
  );
};

export const blockExports: BlockWithProps<BlockExportsProps> = base.createBlock({
  about: {
    name: 'Exports',
  },
  props: {
    exports: exportsSchema.default({
      '.': {
        path: './dist/index.mjs',
        srcPath: './src/index.ts',
      },
    }),
  },
  produce({ options, props }) {
    const { exports } = props;
    const { devExports } = options;

    return {
      extensions: [
        blockPackageJson({
          properties: {
            exports: {
              ...createExportEntries(exports, devExports),
              './package.json': './package.json',
            },
          },
        }),
        ...(devExports
          ? [
              blockPublishConfig({
                exports: {
                  ...createExportEntries(exports, false),
                  './package.json': './package.json',
                },
              }),
            ]
          : []),
      ],
    };
  },
});
