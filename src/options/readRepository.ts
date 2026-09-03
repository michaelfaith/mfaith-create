import { GitUrl } from "git-url-parse";

import { PartialPackageData } from "../types.js";

const repositoryRegex =
	/^(?:git\+)?https:\/\/github\.com\/[^/]+\/(.+?)(?:\.git)?$/;

const getRepositoryFromPackageData = async (
	getPackageData: () => Promise<PartialPackageData>,
): Promise<string | undefined> => {
	const packageData = await getPackageData();
	if (
		typeof packageData.repository === "object" &&
		packageData.repository.url
	) {
		return repositoryRegex.exec(packageData.repository.url)?.[1];
	}

	return undefined;
};

export async function readRepository(
	getGitDefaults: () => Promise<GitUrl | undefined>,
	getPackageData: () => Promise<PartialPackageData>,
	options: { directory?: string; repository?: string },
) {
	return (
		options.repository ??
		(await getGitDefaults())?.name ??
		(await getRepositoryFromPackageData(getPackageData)) ??
		options.directory
	);
}
