import { GitUrl } from "git-url-parse";

import { PartialPackageData } from "../types.js";

const repositoryRegex =
	/^(?:git\+)?https:\/\/github\.com\/[^/]+\/(.+?)(?:\.git)?$/;

export async function readRepository(
	getGitDefaults: () => Promise<GitUrl | undefined>,
	getPackageDataFull: () => Promise<PartialPackageData>,
	options: { directory?: string; repository?: string },
) {
	const packageData = await getPackageDataFull();
	let repositoryFromGit: string | undefined;
	if (
		typeof packageData.repository === "object" &&
		packageData.repository.url
	) {
		repositoryFromGit = repositoryRegex.exec(packageData.repository.url)?.[1];
	}

	return (
		options.repository ??
		(await getGitDefaults())?.name ??
		repositoryFromGit ??
		options.directory
	);
}
