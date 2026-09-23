import { describe, expectTypeOf, it } from 'vitest';
import type { z } from 'zod';

import type { Options, optionsShape } from './Options.ts';

type InferredOptions = z.infer<z.ZodObject<typeof optionsShape>>;

describe('Options', () => {
  it('matches the options schema inference', () => {
    expectTypeOf<Options>().toEqualTypeOf<InferredOptions>();
  });
});
