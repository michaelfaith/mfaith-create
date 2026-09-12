import sortKeys from "sort-keys";
import { z } from "zod";

import { base } from "../base.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { intakeFileAsYaml } from "./intake/intakeFileAsYaml.ts";

const pnpmWorkspaceSchema = z
  .object({
    trustPolicy: z
      .union([z.literal("off"), z.literal("no-downgrade")])
      .optional(),
  })
  .passthrough();
type PnpmWorkspace = z.infer<typeof pnpmWorkspaceSchema>;

export const blockPnpmWorkspace = base.createBlock({
  about: {
    name: "pnpm Workspace",
    description: "Creates a Workspace configuration file for pnpm.",
  },
  addons: {
    config: pnpmWorkspaceSchema.optional(),
  },
  intake({ files }) {
    const existingWorkspace = intakeFileAsYaml(files, [
      "pnpm-workspace.yaml",
    ]) as PnpmWorkspace | undefined;
    if (!existingWorkspace) {
      return undefined;
    }

    return {
      config: existingWorkspace,
    };
  },
  produce({ addons }) {
    const { config } = addons;
    return {
      files: {
        "pnpm-workspace.yaml": formatYaml(
          sortKeys({
            trustPolicy: "no-downgrade",
            ...config,
          }),
        ),
      },
    };
  },
});
