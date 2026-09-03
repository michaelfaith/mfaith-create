import { PartialPackageData } from "../types.js";

export async function readPackageName(
	getPackageData: () => Promise<PartialPackageData>,
	options: { packageName?: string },
) {
	const packageData = await getPackageData();

	return options.packageName ?? packageData.name;
}
