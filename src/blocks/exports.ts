import { z } from 'zod';

import { base } from '../base.ts';
import { makeRelativePath } from '../utils/makeRelativePath.ts';
import type { BlockWithProps } from './Block.ts';
import { packageJson } from './packageJson.ts';
import { publishConfig } from './publishConfig.ts';

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
export interface ExportsProps {
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

export const exports: BlockWithProps<ExportsProps> = base.createBlock({
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
        packageJson({
          properties: {
            exports: {
              ...createExportEntries(exports, devExports),
              './package.json': './package.json',
            },
          },
        }),
        ...(devExports
          ? [
              publishConfig({
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
