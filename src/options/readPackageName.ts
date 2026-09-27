import type { PartialPackageData } from '../types.ts';

export async function readPackageName(
  getPackageData: () => Promise<PartialPackageData>,
  getRepository: () => Promise<string | undefined>,
  options: { packageName?: string },
): Promise<string | undefined> {
  const packageData = await getPackageData();

  return options.packageName ?? packageData.name ?? (await getRepository());
}
