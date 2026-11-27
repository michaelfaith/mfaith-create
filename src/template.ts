import type { StratumTemplate } from 'bingo-stratum';

import { base } from './base.ts';
import { areTheTypesWrong } from './blocks/areTheTypesWrong.ts';
import { eslintPlugin } from './blocks/eslintPlugin.ts';
import { ncc } from './blocks/ncc.ts';
import { removeDependencies } from './blocks/removeDependencies.ts';
import { removeFiles } from './blocks/removeFiles.ts';
import { repoTransitions } from './blocks/repoTransitions.ts';
import { webExt } from './blocks/webExt.ts';
import type { OptionsShape } from './Options.ts';
import { presetCommon } from './presets/common.ts';
import { presetEverything } from './presets/everything.ts';
import { presetMinimal } from './presets/minimal.ts';

export const template: StratumTemplate<OptionsShape> = base.createStratumTemplate({
  about: {
    name: '@mfaith/create',
    repository: {
      owner: 'michaelfaith',
      repository: 'mfaith-create',
    },
  },
  blocks: [
    areTheTypesWrong,
    eslintPlugin,
    ncc,
    removeDependencies,
    removeFiles,
    repoTransitions,
    webExt,
  ],
  presets: [presetMinimal, presetCommon, presetEverything],
  suggested: presetCommon,
});
