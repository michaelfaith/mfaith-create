import type { CreateTemplateConfig } from 'bingo';
import type { TemplateConfig } from 'bingo';
import type { StratumRefinements, StratumTemplateOptionsShapeFor } from 'bingo-stratum';

import type { Options, OptionsShape } from './Options.ts';
import { template } from './template.ts';

export type Config = TemplateConfig<
  StratumTemplateOptionsShapeFor<OptionsShape>,
  StratumRefinements<Options>
>;

export const createConfig: CreateTemplateConfig<
  StratumTemplateOptionsShapeFor<OptionsShape>,
  StratumRefinements<Options>
> = template.createConfig;
