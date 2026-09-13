import type { IntakeDirectory } from 'bingo-fs';

import _ from 'lodash';
import { z } from 'zod';

import { intakeFileAsYaml } from '../intake/intakeFileAsYaml.ts';

export const zActionStep = z.intersection(
  z.object({
    env: z.record(z.string(), z.string()).optional(),
    if: z.string().optional(),
    with: z.record(z.string(), z.string()).optional(),
  }),
  z.union([z.object({ run: z.string() }), z.object({ uses: z.string() })]),
);

export interface ActionInput {
  default?: boolean | number | string;
  description?: string;
  required?: boolean;
  type?: 'boolean' | 'number' | 'string';
}

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
