import { z } from 'zod';

export const StepSchema: z.ZodType<Step> = z.intersection(
  z.union([
    z.object({ run: z.string() }),
    z.object({
      uses: z.string(),
    }),
  ]),
  z.object({
    env: z.record(z.string(), z.string()).optional(),
    id: z.string().optional(),
    if: z.string().optional(),
    name: z.string().optional(),
    with: z
      .record(z.string(), z.union([z.boolean(), z.number(), z.string()]))
      .optional(),
  }),
);

export type Step = {
  env?: Record<string, string> | undefined;
  id?: string | undefined;
  if?: string | undefined;
  name?: string | undefined;
  with?: Record<string, boolean | number | string> | undefined;
} & (
  | {
      run: string;
      uses?: never;
    }
  | {
      run?: never;
      uses: string;
    }
);
