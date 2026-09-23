import type { IntakeDirectory } from 'bingo-fs';
import _ from 'lodash';

import type { ActionInput } from '../workflows/schema.ts';
import { intakeFileAsYaml } from './intakeFileAsYaml.ts';

export function intakeActionInput(
  files: IntakeDirectory,
  filePath: string[],
  inputName: string,
): ActionInput | undefined {
  const actionYml = intakeFileAsYaml(files, filePath);
  if (!actionYml) {
    return undefined;
  }

  const ymlPath = ['inputs', inputName];

  const inputValue = _.get(actionYml, ymlPath) as ActionInput | undefined;
  if (!inputValue || typeof inputValue !== 'object') {
    return undefined;
  }

  return inputValue;
}
