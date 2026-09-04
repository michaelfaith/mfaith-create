import { describe, expect, it } from "vitest";

import { readReadmeExplainer } from "./readReadmeExplainer.js";

describe(readReadmeExplainer, () => {
	it("resolves with undefined when an h2 cannot be found", async () => {
		const actual = await readReadmeExplainer(() => Promise.resolve(`nothing.`));

		expect(actual).toBeUndefined();
	});

	it("resolves with undefined before h2 when a Usage h2 exists and there are no preceding tags", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`# Title

## Usage`),
		);

		expect(actual).toBeUndefined();
	});

	it("resolves with undefined before h2 when a non-Usage h2 exists and there are no preceding tags", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`# Title

## What?`),
		);

		expect(actual).toBeUndefined();
	});

	it("parses a line after badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
</p>

This is my project.

## Usage

...`),
		);

		expect(actual).toEqual("This is my project.");
	});

	it("parses multiple lines after badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
</p>

This is my project.
It is good.

## Usage

...`),
		);

		expect(actual).toEqual("This is my project.\nIt is good.");
	});

	it("parses multiple lines after full badges and a logo", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 52" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-52-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://codecov.io/gh/michaelfaith/mfaith-create" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/michaelfaith/mfaith-create?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/michaelfaith/mfaith-create/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/mfaith-create.png" width="128">

This is my project.
It is good.

## Usage

...`),
		);

		expect(actual).toEqual("This is my project.\nIt is good.");
	});

	it("parses a non-Usage h2 after full badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 52" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-52-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://codecov.io/gh/michaelfaith/mfaith-create" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/michaelfaith/mfaith-create?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/michaelfaith/mfaith-create/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

## What?

This is my project.
It is good.

## Usage

...`),
		);

		expect(actual).toEqual("## What?\n\nThis is my project.\nIt is good.");
	});

	it("parses a non-Usage h2 with a block quote after full badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

## What?

This is my project.
It is good.

> See here.

## Usage

...`),
		);

		expect(actual).toEqual(
			"## What?\n\nThis is my project.\nIt is good.\n\n> See here.",
		);
	});

	it("parses a non-Usage h2 after full badges and a logo", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/mfaith-create.png" width="128">

## What?

This is my project.
It is good.

## Usage

...`),
		);

		expect(actual).toEqual("## What?\n\nThis is my project.\nIt is good.");
	});

	it("parses a non-Usage h2 with a block quote after full badges and a logo", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/mfaith-create.png" width="128">

## What?

This is my project.
It is good.

> See here.

## Usage

...`),
		);

		expect(actual).toEqual(
			"## What?\n\nThis is my project.\nIt is good.\n\n> See here.",
		);
	});

	it("returns existing content before a non-Usage h2 when the Usage h2 does not exist", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/mfaith-create.png" width="128">

## What?

This is my project.
It is good.

> See here.

## Contributing

...`),
		);

		expect(actual).toEqual(
			"## What?\n\nThis is my project.\nIt is good.\n\n> See here.",
		);
	});

	it("returns existing content until the end of the file when no subsequent h2 exists", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/@mfaith/create"><img alt="📦 npm version" src="https://img.shields.io/npm/v/@mfaith/create?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/mfaith-create.png" width="128">

## What?

This is my project.
It is good.

> See here.
`),
		);

		expect(actual).toEqual(
			"## What?\n\nThis is my project.\nIt is good.\n\n> See here.",
		);
	});
});
