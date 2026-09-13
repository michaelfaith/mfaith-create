import { base } from './base.ts';
import { blockAreTheTypesWrong } from './blocks/blockAreTheTypesWrong.ts';
import { blockESLintPlugin } from './blocks/blockESLintPlugin.ts';
import { blockNcc } from './blocks/blockNcc.ts';
import { blockRemoveDependencies } from './blocks/blockRemoveDependencies.ts';
import { blockRemoveFiles } from './blocks/blockRemoveFiles.ts';
import { blockRepoTransitions } from './blocks/blockRepoTransitions.ts';
import { blockWebExt } from './blocks/blockWebExt.ts';
import { presetCommon } from './presets/common.ts';
import { presetEverything } from './presets/everything.ts';
import { presetMinimal } from './presets/minimal.ts';

export const template = base.createStratumTemplate({
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
    blockESLintPlugin,
    blockNcc,
    blockRemoveDependencies,
    blockRemoveFiles,
    blockWebExt,
  ],
  presets: [presetMinimal, presetCommon, presetEverything],
  suggested: presetCommon,
});
