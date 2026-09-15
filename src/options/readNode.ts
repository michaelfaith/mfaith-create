import type { NodeVersions } from '../schemas.ts';
import type { PartialPackageData } from '../types.ts';

import { defaults } from '../constants.ts';
import { swallowError } from '../utils/swallowError.ts';

const numberRegex = /\d/u;

export async function readNode(
  getNvmrc: () => Promise<Error | string>,
  getPackageData: () => Promise<PartialPackageData>,
): Promise<NodeVersions> {
  const { engines } = await getPackageData();

  return {
    supported:
      (engines?.node && numberRegex.test(engines.node) && engines.node) ||
      defaults.node.supported,
    pinned: swallowError(await getNvmrc())?.trim() || defaults.node.pinned,
  };
}
