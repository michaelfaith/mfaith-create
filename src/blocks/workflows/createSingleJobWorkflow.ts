import type { SingleJobWorkflow } from './schema.ts';

import { formatWorkflowYaml } from '../files/formatWorkflowYaml.ts';
import { createJobName } from './createJobName.ts';

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
