import { describe, expect, it, vi } from "vitest";

import { readPackageName } from "./readPackageName.js";

describe(readPackageName, () => {
	it("returns options.packageName when it exists", async () => {
		const packageName = "test-package-name";
		const getPackageDataFull = vi
			.fn()
			.mockResolvedValueOnce({ name: "test-name" });
		const options = { packageName };

		const actual = await readPackageName(getPackageDataFull, options);

		expect(actual).toBe(packageName);
	});

	it("returns package data name when only it exists", async () => {
		const name = "test-name";
		const getPackageDataFull = vi.fn().mockResolvedValueOnce({ name });
		const options = {};

		const actual = await readPackageName(getPackageDataFull, options);

		expect(actual).toBe(name);
	});
});
