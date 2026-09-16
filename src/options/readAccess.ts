import type { PartialPackageData } from '../types.ts';

export async function readAccess(
  getPackageData: () => Promise<PartialPackageData | undefined>,
): Promise<'public' | 'restricted'> {
  return (await getPackageData())?.publishConfig?.access ?? 'public';
}
