import type { SingleJobWorkflow } from './schema.ts';

import { formatWorkflowYaml } from '../files/formatWorkflowYaml.ts';
import { createJobName } from './createJobName.ts';

export function createSingleJobWorkflow({
  concurrency,
  job,
  name,
  on,
}: SingleJobWorkflow): string {
  return formatWorkflowYaml({
    name,
    on,
    concurrency,
    jobs: {
      [job.id ?? createJobName(job.name ?? name)]: {
        ...(job.name && { name: job.name }),
        ...(job.if && { if: job.if }),
        'runs-on': job['runs-on'] || 'ubuntu-latest',
        permissions: job.permissions,
        steps: job.steps,
      },
    },
  });
}
