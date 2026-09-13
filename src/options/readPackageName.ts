import type { PartialPackageData } from '../types.ts';

export async function readPackageName(
  getPackageData: () => Promise<PartialPackageData>,
  options: { packageName?: string },
) {
  const packageData = await getPackageData();

  return options.packageName ?? packageData.name;
}
