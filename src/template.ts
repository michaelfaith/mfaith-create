import type { StratumTemplate } from 'bingo-stratum';

import { base } from './base.ts';
import { blockAreTheTypesWrong } from './blocks/areTheTypesWrong.ts';
import { blockEslintPlugin } from './blocks/blockEslintPlugin.ts';
import { blockNcc } from './blocks/blockNcc.ts';
import { blockRemoveDependencies } from './blocks/removeDependencies.ts';
import { blockRemoveFiles } from './blocks/removeFiles.ts';
import { blockRepoTransitions } from './blocks/repoTransitions.ts';
import { blockWebExt } from './blocks/webExt.ts';
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
    blockAreTheTypesWrong,
    blockRepoTransitions,
    blockEslintPlugin,
    blockNcc,
    blockRemoveDependencies,
    blockRemoveFiles,
    blockWebExt,
  ],
  presets: [presetMinimal, presetCommon, presetEverything],
  suggested: presetCommon,
});
