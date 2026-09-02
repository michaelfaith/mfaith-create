import { prepareOptions } from "bingo";
import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";

import { base } from "./base.js";
import { AllContributorsData } from "./types.js";

describe("base", () => {
	test("production from create-typescript-app", async () => {
		const options = await prepareOptions(base);

		expect(options).toEqual({
			access: "public",
			author: "michael faith",
			bin: "bin/index.js",
			contributors: (
				JSON.parse(
					(await readFile(".all-contributorsrc")).toString(),
				) as AllContributorsData
			).contributors,
			description:
				"A quickstart-friendly repo template with comprehensive, opinionated tooling.",
			documentation: {
				development: expect.any(String),
				readme: {
					additional: expect.any(String),
					explainer: [
						`\`@mfaith/create\` is a one-stop-shop solution to set up a new repository with the latest and greatest TypeScript tooling and open source conventions.`,
						`It includes options not just for building and testing but also automated release management, contributor recognition, GitHub repository settings, and more.`,
					].join("\n"),
					footnotes: undefined,
					usage: expect.any(String),
				},
			},
			emoji: "💖",
			existingLabels: expect.any(Array),
			guide: {
				href: "https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository",
				title: "Contributing to a create-typescript-app Repository",
			},
			node: {
				minimum: expect.any(String),
				pinned: expect.any(String),
			},
			owner: "michaelfaith",
			packageData: expect.any(Object),
			pnpm: expect.any(String),
			repository: "mfaith-create",
			title: "@mfaith/create",
			type: expect.any(String),
			version: expect.any(String),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports
			words: require("../cspell.json").words,
			workflowsVersions: expect.any(Object),
		});
	});
});
