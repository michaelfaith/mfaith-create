import { BaseOptions } from "../base.js";

export const optionsBase = {
	access: "public",
	contact: {
		email: "github@email.com",
		url: "http://contact.url",
	},
	description: "Test description",
	directory: ".",
	documentation: {
		readme: {
			usage: "Test usage.",
		},
	},
	emoji: "💖",
	node: {
		minimum: "20.12.0",
	},
	owner: "test-owner",
	packageName: "test-package-name",
	preset: "minimal",
	repository: "test-repository",
	title: "Test Title",
} satisfies BaseOptions;
