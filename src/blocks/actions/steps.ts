import { IntakeDirectory } from "bingo-fs";
import _ from "lodash";
import { z } from "zod";

import { intakeFileAsYaml } from "../intake/intakeFileAsYaml.js";

export const zActionStep: z.ZodType<ActionStep> = z.intersection(
  z.object({
    env: z.record(z.string(), z.string()).optional(),
    if: z.string().optional(),
    with: z
      .record(z.string(), z.union([z.boolean(), z.number(), z.string()]))
      .optional(),
  }),
  z.union([z.object({ run: z.string() }), z.object({ uses: z.string() })]),
);

export type ActionStep = {
  env?: Record<string, string> | undefined;
  if?: string | undefined;
  with?: Record<string, boolean | number | string> | undefined;
} & (
  | {
      run: string;
    }
  | {
      uses: string;
    }
);

export interface JobOrRunStep {
  env?: Record<string, string>;
  uses?: unknown;
  with?: Record<string, boolean | number | string>;
}

export function intakeFileYamlSteps(
  files: IntakeDirectory,
  filePath: string[],
  ymlPath: string[],
): JobOrRunStep[] | undefined {
  const actionYml = intakeFileAsYaml(files, filePath);
  if (!actionYml) {
    return undefined;
  }

  const steps = _.get(actionYml, ymlPath) as JobOrRunStep[] | undefined;
  if (!steps || !Array.isArray(steps)) {
    return undefined;
  }

  return steps;
}
