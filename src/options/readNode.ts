import { defaults } from "../constants.js";
import { PartialPackageData } from "../types.js";
import { swallowError } from "../utils/swallowError.js";

const numberRegex = /\d/u;

export async function readNode(
  getNvmrc: () => Promise<Error | string>,
  getPackageData: () => Promise<PartialPackageData>,
) {
  const { engines } = await getPackageData();

  return {
    minimum:
      (engines?.node && numberRegex.test(engines.node) && engines.node) ||
      defaults.node.minimum,
    pinned: swallowError(await getNvmrc())?.trim() || defaults.node.pinned,
  };
}
