import { z } from "zod";

import { base } from "../base.ts";
import { getInstallationSuggestions } from "./getInstallationSuggestions.ts";

export const blockRepositoryVariables = base.createBlock({
  about: {
    name: "Repository Variables",
  },
  addons: {
    variables: z
      .array(
        z.object({
          description: z.string(),
          name: z.string(),
        }),
      )
      .default([]),
  },
  produce({ addons, options }) {
    return {
      suggestions: getInstallationSuggestions(
        "populate the variable",
        addons.variables.map(
          (variable) => `${variable.name} (${variable.description})`,
        ),
        `https://github.com/${options.owner}/${options.repository}/settings/variables/actions`,
      ),
    };
  },
});
