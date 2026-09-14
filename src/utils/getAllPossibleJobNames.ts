import type { WorkflowJob } from '../blocks/workflows/schema.ts';

export const getAllPossibleJobNames = (job: WorkflowJob): string[] => {
  if (!job.strategy?.matrix || !Object.entries(job.strategy.matrix).length) {
    return [job.name];
  }

  let allJobNames = [job.name];

  for (const [property, values] of Object.entries(job.strategy.matrix)) {
    const evaluatedJobNames = new Set<string>();
    const expression = new RegExp(
      String.raw`\$\{\{\s*matrix\.${RegExp.escape(property)}\s*\}\}`,
      'g',
    );

    if (!values.length) {
      continue;
    }

    for (const value of values) {
      for (const jobName of allJobNames) {
        evaluatedJobNames.add(jobName.replaceAll(expression, String(value)));
      }
    }

    allJobNames = Array.from(evaluatedJobNames);
  }

  return allJobNames;
};
