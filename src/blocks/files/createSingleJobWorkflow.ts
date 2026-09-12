import type { SingleJobWorkflow } from './workflow.types.ts';

import { createJobName } from './createJobName.ts';
import { formatWorkflowYaml } from './formatWorkflowYaml.ts';

export function createSingleJobWorkflow({
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
        'runs-on': job['runs-on'] || 'ubuntu-latest',
        permissions: job.permissions,
        steps: job.steps,
      },
    },
  });
}
