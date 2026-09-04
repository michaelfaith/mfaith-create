import type { KnipConfig } from "knip";

export default {
	entry: ["src/**/*.test.*"],
	ignoreDependencies: [
		"@release-it/conventional-changelog",
		"all-contributors-cli",
		"cspell-populate-words",
		"release-it",
		"remove-dependencies",
		"trash-cli",
	],
	ignoreExportsUsedInFile: { interface: true, type: true },
	project: ["src/**/*.ts"],
	treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
