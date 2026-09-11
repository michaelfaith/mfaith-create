import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { intakeFileYamlSteps } from "./actions/steps.ts";
import { blockGitHubApps } from "./blockGitHubApps.ts";
import { blockREADME } from "./blockREADME.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockVitest } from "./blockVitest.ts";

export const blockCodecov = base.createBlock({
  about: {
    name: "Codecov",
  },
  addons: {
    env: z.record(z.string(), z.string()).optional(),
  },
  intake({ files }) {
    const steps = intakeFileYamlSteps(
      files,
      [".github", "workflows", "ci.yaml"],
      ["jobs", "test", "steps"],
    );
    if (!steps) {
      return undefined;
    }

    const step = steps.find(
      (step) =>
        typeof step.uses === "string" &&
        step.uses.startsWith("codecov/codecov-action"),
    );
    if (!step) {
      return undefined;
    }

    return {
      env: step.env,
    };
  },
  produce({ addons, options }) {
    const { env } = addons;
    const actionStep = {
      uses: resolveUses(
        "codecov/codecov-action",
        "v7",
        options.workflowsVersions,
      ),
      ...(env && { env }),
      with: {
        fail_ci_if_error: true,
        use_oidc: true,
      },
    };

    return {
      addons: [
        blockGitHubApps({
          apps: [
            {
              name: "Codecov",
              url: "https://github.com/apps/codecov",
            },
          ],
        }),
        blockREADME({
          badges: [
            {
              alt: "🧪 Coverage",
              href: `https://codecov.io/gh/${options.owner}/${options.repository}`,
              src: `https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage`,
            },
          ],
        }),
        blockVitest({
          actionSteps: [actionStep],
          permissions: {
            "id-token": "write",
          },
        }),
      ],
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveFiles({
          files: [".github/codecov.{yaml,yml}", "codecov.{yaml,yml}"],
        }),
      ],
    };
  },
});
