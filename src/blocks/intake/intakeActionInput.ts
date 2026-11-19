import type { IntakeDirectory } from 'bingo-fs';

import { isPlainObject } from '../../utils/isPlainObject.ts';
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

  if (!isPlainObject(actionYml)) {
    return undefined;
  }

  const inputs = actionYml.inputs as Record<string, unknown> | undefined;

  const inputValue = inputs?.[inputName];
  if (!inputValue || typeof inputValue !== 'object') {
    return undefined;
  }

  return inputValue;
}
