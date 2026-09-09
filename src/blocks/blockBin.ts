import { z } from "zod";

import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { blockExampleFiles } from "./blockExampleFiles.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.js";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.js";

const binSchema = z.union([z.string(), z.record(z.string(), z.string())]);

const tsExtensionRegex = /(.*)\.([cm]?)ts$/i;
const jsExtensionRegex = /(.*)\.([cm]?)js$/i;

const srcToDist = (value: string) =>
  value.replace("src", "dist").replace(tsExtensionRegex, "$1.$2js");
const distToSrc = (value: string) =>
  value.replace("dist", "src").replace(jsExtensionRegex, "$1.$2ts");

export const blockBin = base.createBlock({
  about: {
    name: "Bin",
  },
  addons: {
    src: binSchema.optional(),
  },
  intake({ files }) {
    const raw = intakeFileAsJson(files, ["package.json"]);
    const { data } = binSchema.safeParse(raw?.bin);
    if (!data) {
      return undefined;
    }

    let src: string | Record<string, string>;
    if (typeof data === "string") {
      src = distToSrc(data);
    } else {
      src = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, distToSrc(value)]),
      );
    }

    return {
      src,
    };
  },
  produce({ addons, options }) {
    const { src = "src/bin/index.ts" } = addons;

    let bin: string | Record<string, string>;
    if (typeof src === "string") {
      bin = srcToDist(src);
    } else {
      bin = Object.fromEntries(
        Object.entries(src).map(([key, value]) => [key, srcToDist(value)]),
      );
    }

    return {
      addons: [
        blockESLint({
          extensions: [
            {
              files: [getScriptFileExtension(options)],
              rules: [
                {
                  comment: "Using a ts bin file throws this rule off.",
                  entries: { "n/hashbang": "off" as const },
                },
              ],
            },
          ],
        }),
        blockPackageJson({
          properties: {
            bin,
          },
        }),
        blockExampleFiles({
          files: {
            bin: {
              "index.ts": `#!/usr/bin/env node
import { greet } from "../index.ts";

greet("Hello, world! ${options.emoji}");`,
            },
          },
        }),
      ],
    };
  },
});
