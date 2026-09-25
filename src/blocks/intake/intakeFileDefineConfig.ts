import type { IntakeDirectory } from 'bingo-fs';

import { tryParseJson5 } from '../../utils/tryParseJson5.ts';
import { intakeFile } from './intakeFile.ts';

export function intakeFileDefineConfig(
  files: IntakeDirectory,
  filePath: (string | string[])[],
): Record<string, unknown> | undefined {
  const file = intakeFile(files, filePath);
  if (!file) {
    return undefined;
  }

  const normalized = file[0].replaceAll(/[\n\r]/g, '');
  const matched = /defineConfig\(\{(.+)\}\)\s*(?:;\s*)?$/u.exec(normalized);
  if (!matched) {
    return undefined;
  }

  const rawData = tryParseJson5(`{${matched[1]}}`);
  if (!rawData || typeof rawData !== 'object') {
    return undefined;
  }

  return rawData;
}
