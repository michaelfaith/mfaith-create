import type { TemplateConfig } from 'bingo';
import type { StratumRefinements } from 'bingo-stratum';

import type { Options, OptionsShape } from './Options.ts';

export type Config = TemplateConfig<OptionsShape, StratumRefinements<Options>>;

export interface UserConfig {
  options?: Partial<Options> | undefined;
  refinements?: StratumRefinements<Options> | undefined;
}
