import type { IntakeDirectory } from 'bingo-fs';

import _ from 'lodash';

import type { Step } from '../workflows/step.types.ts';

import { intakeFileAsYaml } from './intakeFileAsYaml.ts';

export function intakeActionOrWorkflowSteps(
  files: IntakeDirectory,
  filePath: string[],
  ymlPath: string[],
): Step[] | undefined {
  const actionYml = intakeFileAsYaml(files, filePath);
  if (!actionYml) {
    return undefined;
  }

  const steps = _.get(actionYml, ymlPath) as Step[] | undefined;
  if (!steps || !Array.isArray(steps)) {
    return undefined;
  }

  return steps;
}
