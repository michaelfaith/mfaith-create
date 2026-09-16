import type { Workflow } from './schema.ts';

import { formatWorkflowYaml } from '../files/formatWorkflowYaml.ts';
import { createJobName } from '../workflows/createJobName.ts';

export function createMultiJobWorkflow({
  concurrency,
  jobs,
  name,
  on,
}: Workflow): string {
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
          'runs-on': job['runs-on'] || 'ubuntu-latest',
          permissions: job.permissions,
          outputs: job.outputs,
          strategy: job.strategy,
          steps: job.steps,
        },
      ]),
    ),
  });
}
