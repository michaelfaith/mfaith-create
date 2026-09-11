import type { Workflow } from "./workflow.types.ts";

import { createJobName } from "./createJobName.ts";
import { formatWorkflowYaml } from "./formatWorkflowYaml.ts";

export function createMultiJobWorkflow({
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
