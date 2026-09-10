import type { SingleJobWorkflow } from "./workflow.types.js";

import { createJobName } from "./createJobName.js";
import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

export function createSoloWorkflowFile({
  concurrency,
  job,
  name,
  on,
}: SingleJobWorkflow) {
  return formatWorkflowYaml({
    name,
    on,
    concurrency,
    jobs: {
      [createJobName(job.name ?? name)]: {
        ...(job.if && { if: job.if }),
        ...(job.name && { name: job.name }),
        "runs-on": job["runs-on"] || "ubuntu-latest",
        permissions: job.permissions,
        steps: job.steps,
      },
    },
  });
}
