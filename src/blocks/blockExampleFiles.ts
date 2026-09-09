import { z } from "zod";

import { base } from "../base.js";
import { blockREADME } from "./blockREADME.js";

interface DirectoryEntry {
  [i: string]: Entry;
}
type Entry = DirectoryEntry | string;

const fileEntrySchema: z.ZodType<DirectoryEntry> = z.record(
  z.string(),
  z.union([z.string(), z.lazy(() => fileEntrySchema)]),
);

export const blockExampleFiles = base.createBlock({
  about: {
    name: "Example Files",
  },
  addons: {
    files: fileEntrySchema.default({}),
    usage: z.array(z.string()).default([]),
  },
  setup({ addons }) {
    const { usage } = addons;

    return {
      addons: [
        blockREADME({
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
