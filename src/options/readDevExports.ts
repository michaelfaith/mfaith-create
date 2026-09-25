import type { PartialPackageData, PartialTsdownConfig } from '../types.ts';

export async function readDevExports(
  getTsdownConfig: () => Promise<PartialTsdownConfig>,
  getPackageData: () => Promise<PartialPackageData>,
): Promise<boolean> {
  const [tsdownConfig, packageData] = await Promise.all([
    getTsdownConfig(),
    getPackageData(),
  ]);

  if (
    typeof tsdownConfig.exports === 'object' &&
    tsdownConfig.exports.devExports
  ) {
    return true;
  }

  return !!packageData.publishConfig?.exports;
}
