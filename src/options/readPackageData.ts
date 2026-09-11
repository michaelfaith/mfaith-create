import type { TakeInput } from "bingo";

import { inputFromFileJSON } from "input-from-file-json";

import type { PartialPackageData } from "../types.ts";

import { swallowError } from "../utils/swallowError.ts";

export async function readPackageData(
  take: TakeInput,
): Promise<PartialPackageData> {
  return (
    swallowError(
      await take(inputFromFileJSON, {
        filePath: "./package.json",
      }),
    ) || {}
  );
}
