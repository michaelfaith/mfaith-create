import type { TemplateConfig } from 'bingo';
import type { StratumRefinements } from 'bingo-stratum';

import type { Options } from './Options.ts';
import type { template } from './template.ts';

export type Config = TemplateConfig<
  typeof template.options,
  StratumRefinements<Options>
>;

export interface UserConfig {
  options?: Partial<Options> | undefined;
  refinements?: StratumRefinements<Options> | undefined;
}
