import type { WorkflowPermissions } from "./workflow.types.js";

import { WorkflowsVersions } from "../../schemas.js";
import { createJobName } from "./createJobName.js";
import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

export interface MultiWorkflowFileOptions {
  jobs: MultiWorkflowJobOptions[];
  name: string;
  workflowsVersions: undefined | WorkflowsVersions;
}

export interface MultiWorkflowJobOptions {
  checkoutWith?: Record<string, string>;
  if?: string;
  name: string;
  permissions?: WorkflowPermissions;
  steps: MultiWorkflowJobStep[];
}

export type MultiWorkflowJobStep = { if?: string } & (
  | { run: string }
  | { uses: string; with?: Record<string, boolean | number | string> }
);

export function createMultiWorkflowFile({
  jobs,
  name,
}: MultiWorkflowFileOptions) {
  return formatWorkflowYaml({
    name,
    on: {
      pull_request: null,
      push: {
        branches: ["main"],
      },
    },
    jobs: Object.fromEntries(
      jobs.map((job) => [
        createJobName(job.name),
        {
          name: job.name,
          if: job.if,
          "runs-on": "ubuntu-latest",
          permissions: job.permissions ?? undefined,
          steps: job.steps,
        },
      ]),
    ),
  });
}
