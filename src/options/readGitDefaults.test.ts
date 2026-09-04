import { describe, expect, it, vi } from "vitest";

import { readGitDefaults } from "./readGitDefaults.js";

const mockGitRemoteOriginUrl = vi.fn();

vi.mock("git-remote-origin-url", () => ({
	get default() {
		return mockGitRemoteOriginUrl;
	},
}));

describe(readGitDefaults, () => {
	it("resolves undefined when get-url origin has no stdout", async () => {
		const take = vi.fn().mockResolvedValueOnce({});

		const actual = await readGitDefaults(take);

		expect(actual).toBeUndefined();
	});

	it("resolves the parsed url when get-url origin url succeeds", async () => {
		const take = vi.fn().mockResolvedValueOnce({
			stdout: "https://github.com/michaelfaith/mfaith-create.git",
		});

		const actual = await readGitDefaults(take);

		expect(actual).toMatchObject({
			name: "mfaith-create",
			owner: "michaelfaith",
		});
	});
});
