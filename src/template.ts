import { base } from "./base.js";
import { blockAreTheTypesWrong } from "./blocks/blockAreTheTypesWrong.js";
import { blockESLintPlugin } from "./blocks/blockESLintPlugin.js";
import { blockNcc } from "./blocks/blockNcc.js";
import { blockRemoveDependencies } from "./blocks/blockRemoveDependencies.js";
import { blockRemoveFiles } from "./blocks/blockRemoveFiles.js";
import { blockRepoTransitions } from "./blocks/blockRepoTransitions.js";
import { blockWebExt } from "./blocks/blockWebExt.js";
import { presetCommon } from "./presets/common.js";
import { presetEverything } from "./presets/everything.js";
import { presetMinimal } from "./presets/minimal.js";

export const template = base.createStratumTemplate({
	about: {
		name: "@mfaith/create",
		repository: {
			owner: "michaelfaith",
			repository: "mfaith-create",
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
