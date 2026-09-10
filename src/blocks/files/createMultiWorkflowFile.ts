import type { Workflow } from "./workflow.types.js";

import { createJobName } from "./createJobName.js";
import { formatWorkflowYaml } from "./formatWorkflowYaml.js";

export function createMultiWorkflowFile({
  concurrency,
  jobs,
  name,
  on,
}: Workflow) {
  return formatWorkflowYaml({
    name,
    on,
    concurrency,
    jobs: Object.fromEntries(
      jobs.map((job) => [
        createJobName(job.id ?? job.name),
        {
          name: job.name,
          if: job.if,
          needs: job.needs,
          "runs-on": job["runs-on"] || "ubuntu-latest",
          permissions: job.permissions,
          outputs: job.outputs,
          steps: job.steps,
        },
      ]),
    ),
  });
}
