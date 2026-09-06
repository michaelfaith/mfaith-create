import { PartialPackageData } from "../types.js";

export async function readAccess(
  getPackageData: () => Promise<PartialPackageData | undefined>,
) {
  return (await getPackageData())?.publishConfig?.access ?? "public";
}
