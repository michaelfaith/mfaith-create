import { z } from "zod";

import { base } from "../base.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockTSDown } from "./blockTSDown.ts";

export const blockExports = base.createBlock({
  about: {
    name: "Exports",
  },
  addons: {
    filePath: z.string().optional(),
    runArgs: z.array(z.string()).default([]),
  },
  produce({ addons }) {
    const { filePath = "./dist/index.js", runArgs } = addons;

    return {
      addons: [
        blockPackageJson({
          properties: {
            exports: {
              ".": filePath.startsWith(".") ? filePath : `./${filePath}`,
            },
          },
        }),
        blockTSDown({
          runInCI: [
            `node ${filePath}${runArgs.map((arg) => ` ${arg}`).join("")}`,
          ],
        }),
      ],
    };
  },
});
