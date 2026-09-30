import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { blockReadme } from './blockReadme.ts';

export interface DirectoryEntry {
  [i: string]: Entry;
}
export type Entry = DirectoryEntry | string;

const fileEntrySchema: z.ZodType<DirectoryEntry> = z.record(
  z.string(),
  z.union([z.string(), z.lazy(() => fileEntrySchema)]),
);

export interface BlockExampleFilesProps {
  files?: DirectoryEntry;
  usage?: string[];
}

export const blockExampleFiles: BlockWithProps<BlockExampleFilesProps> =
  base.createBlock({
    about: {
      name: 'Example Files',
    },
    addons: {
      files: fileEntrySchema.default({}),
      usage: z.array(z.string()).default([]),
    },
    setup({ addons }) {
      const { usage } = addons;

      return {
        addons: [
          blockReadme({
            defaultUsage: usage,
          }),
        ],
        files: {
          src: addons.files,
        },
      };
    },
    // TODO: Make produce() optional, so this empty-ish produce() can be removed
    // https://github.com/JoshuaKGoldberg/bingo/issues/295
    produce() {
      return {};
    },
  });
