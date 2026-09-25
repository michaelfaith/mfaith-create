import type { TakeInput } from 'bingo';
import { inputFromFile } from 'input-from-file';

import type { PartialTsdownConfig } from '../types.ts';
import { swallowError } from '../utils/swallowError.ts';
import { tryParseJson5 } from '../utils/tryParseJson5.ts';

const defineConfig = /defineConfig\(\{(.*)\}\)/;

export async function readTsdownConfig(
  take: TakeInput,
): Promise<PartialTsdownConfig> {
  const tsdownConfigFile =
    swallowError(
      await take(inputFromFile, {
        filePath: './tsdown.config.ts',
      }),
    ) || undefined;
  if (!tsdownConfigFile) {
    return {};
  }

  const normalized = tsdownConfigFile.replaceAll(/[\n\r]/g, '');
  const matched = defineConfig.exec(normalized);
  if (!matched) {
    return {};
  }

  const rawData = tryParseJson5(`{${matched[1]}}`);
  if (!rawData || typeof rawData !== 'object') {
    return {};
  }

  return rawData;
}
