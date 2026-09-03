import { describe, expect, it, vi } from "vitest";

import { readContactFromCodeOfConduct } from "./readContactFromCodeOfConduct.js";

describe(readContactFromCodeOfConduct, () => {
	it("resolves undefined when CODE_OF_CONDUCT.md cannot be read", async () => {
		const take = vi.fn().mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readContactFromCodeOfConduct(take);

		expect(actual).toBeUndefined();
	});

	it("resolves undefined when CODE_OF_CONDUCT.md is not the Code of Conduct", async () => {
		const take = vi.fn().mockResolvedValueOnce("# Some Other Code of Conduct");

		const actual = await readContactFromCodeOfConduct(take);

		expect(actual).toBeUndefined();
	});

	it("resolves undefined when CODE_OF_CONDUCT.md is a Contributor Code of Conduct without an email", async () => {
		const take = vi.fn().mockResolvedValueOnce(`# Code of Conduct

for enforcement at.
`);

		const actual = await readContactFromCodeOfConduct(take);

		expect(actual).toBeUndefined();
	});

	it("resolves the contact information when CODE_OF_CONDUCT.md has an email", async () => {
		const email = "test@email.com";
		const take = vi.fn().mockResolvedValueOnce(`# Code of Conduct

reported to the community leaders responsible for enforcement at ${email}.
All complaints will be reviewed and investigated promptly and fairly.
`);

		const actual = await readContactFromCodeOfConduct(take);

		expect(actual).toEqual({ bluesky: undefined, email, url: undefined });
	});

	it("resolves the contact information when CODE_OF_CONDUCT.md has a website url", async () => {
		const url = "https://test.com";
		const take = vi.fn().mockResolvedValueOnce(`# Code of Conduct

reported to the community leaders responsible for enforcement at ${url}.
All complaints will be reviewed and investigated promptly and fairly.
`);

		const actual = await readContactFromCodeOfConduct(take);

		expect(actual).toEqual({ bluesky: undefined, email: undefined, url });
	});

	it("resolves the contact information when CODE_OF_CONDUCT.md has a bluesky handle", async () => {
		const bluesky = "michaelfaith";
		const take = vi.fn().mockResolvedValueOnce(`# Code of Conduct

reported to the community leaders responsible for enforcement on [Bluesky](https://bsky.app/profile/${bluesky}).
All complaints will be reviewed and investigated promptly and fairly.
`);

		const actual = await readContactFromCodeOfConduct(take);

		expect(actual).toEqual({ bluesky, email: undefined, url: undefined });
	});
});
