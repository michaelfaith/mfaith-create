import { describe, expect, it } from "vitest";

import { readContact } from "./readContact.js";

describe(readContact, () => {
	it("resolves undefined when no sources provide an email", async () => {
		const actual = await readContact(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({}),
		);

		expect(actual).toBeUndefined();
	});

	it("resolves email from the code of conduct when present", async () => {
		const actual = await readContact(
			() => Promise.resolve({ email: "test-email-coc" }),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: "test-email-coc",
			url: undefined,
		});
	});

	it("resolves npm email", async () => {
		const actual = await readContact(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve("test-email-npm"),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: "test-email-npm",
			url: undefined,
		});
	});

	it("prefers email from the code of conduct when present", async () => {
		const actual = await readContact(
			() => Promise.resolve({ email: "test-email-coc" }),
			() => Promise.resolve(undefined),
			() => Promise.resolve("test-email-npm"),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: "test-email-coc",
			url: undefined,
		});
	});

	it("prefers git email over npm when present", async () => {
		const actual = await readContact(
			() => Promise.resolve(undefined),
			() => Promise.resolve("test-email-git"),
			() => Promise.resolve("test-email-npm"),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: "test-email-git",
			url: undefined,
		});
	});

	it("resolves package author email", async () => {
		const actual = await readContact(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({ email: "test-email-npm" }),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: "test-email-npm",
			url: undefined,
		});
	});

	it("resolves bluesky from the code of conduct when present", async () => {
		const actual = await readContact(
			() => Promise.resolve({ bluesky: "test-bluesky" }),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({
			bluesky: "test-bluesky",
			email: undefined,
			url: undefined,
		});
	});

	it("resolves url from the code of conduct when present", async () => {
		const actual = await readContact(
			() => Promise.resolve({ url: "test-url" }),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: undefined,
			url: "test-url",
		});
	});

	it("resolves url from author when present", async () => {
		const actual = await readContact(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({ url: "test-url-author" }),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: undefined,
			url: "test-url-author",
		});
	});

	it("prefers url from author when present", async () => {
		const actual = await readContact(
			() => Promise.resolve({ url: "test-url-coc" }),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({ url: "test-url-author" }),
		);

		expect(actual).toEqual({
			bluesky: undefined,
			email: undefined,
			url: "test-url-author",
		});
	});

	it("populates all fields when available", async () => {
		const actual = await readContact(
			() => Promise.resolve({ bluesky: "test-bluesky", url: "test-url-coc" }),
			() => Promise.resolve("test-email-git"),
			() => Promise.resolve("test-email-npm"),
			() => Promise.resolve({ url: "test-url-author" }),
		);

		expect(actual).toEqual({
			bluesky: "test-bluesky",
			email: "test-email-git",
			url: "test-url-author",
		});
	});
});
