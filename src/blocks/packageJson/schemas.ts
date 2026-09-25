import { z } from 'zod';

export const binSchema: z.ZodType<Bin> = z.union([
  z.string(),
  z.record(z.string(), z.string()),
]);
export type Bin = string | Record<string, string>;
