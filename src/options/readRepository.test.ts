import { describe, expect, it, vi } from "vitest";

import { readRepository } from "./readRepository.js";

describe(readRepository, () => {
	it("returns options.repository when it exists", async () => {
		const repository = "test-repository";
		const getGitDefaults = vi.fn();
		const getPackageData = vi.fn();
		const options = { repository };

		const actual = await readRepository(
			getGitDefaults,
			getPackageData,
			options,
		);

		expect(actual).toBe(repository);
		expect(getGitDefaults).not.toHaveBeenCalled();
		expect(getPackageData).not.toHaveBeenCalled();
	});

	it("returns git defaults name when only it exists", async () => {
		const name = "test-name";
		const getGitDefaults = vi.fn().mockResolvedValueOnce({ name });
		const getPackageData = vi.fn();

		const actual = await readRepository(getGitDefaults, getPackageData, {});

		expect(actual).toBe(name);
		expect(getPackageData).not.toHaveBeenCalled();
	});

	it("returns package data repository when no get value is returned", async () => {
		const name = "test-name";
		const getGitDefaults = vi.fn();
		const getPackageData = vi.fn().mockResolvedValueOnce({
			repository: { url: `https://github.com/test-owner/${name}.git` },
		});

		const actual = await readRepository(getGitDefaults, getPackageData, {});

		expect(actual).toBe(name);
	});

	it("returns options.directory when only it exists", async () => {
		const directory = "test-directory";
		const getGitDefaults = vi.fn();
		const getPackageData = vi.fn().mockResolvedValueOnce({});
		const options = { directory };

		const actual = await readRepository(
			getGitDefaults,
			getPackageData,
			options,
		);

		expect(actual).toBe(directory);
	});
});
