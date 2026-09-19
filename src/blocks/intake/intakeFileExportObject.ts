import type { IntakeDirectory } from 'bingo-fs';

import JSON5 from 'json5';

import { intakeFile } from './intakeFile.ts';

const defaultRegex = /export\s+default\s*\{(.+)\}/u;
const variableRegex =
  /(?:const|let|var)[ \t]+([\w$]+)[ \t]*(?::[^=]+)?=[ \t]*\{(.+)\}(?:[ \t]*;[ \t]*|[ \t]+)export[ \t]+default[ \t]+\1\b/u;

export function intakeFileExportObject(
  files: IntakeDirectory,
  filePath: (string | string[])[],
): Record<string, unknown> | undefined {
  const file = intakeFile(files, filePath);
  if (!file) {
    return undefined;
  }

  const normalized = file[0].replaceAll(/[\n\r]/g, '');
  const directExport = defaultRegex.exec(normalized);
  const variableExport = variableRegex.exec(normalized);
  const objectText = directExport?.[1] ?? variableExport?.[2];
  if (!objectText) {
    return undefined;
  }

  const rawData = tryParseJSON5(`{${objectText}}`);
  if (!rawData || typeof rawData !== 'object') {
    return undefined;
  }

  return rawData;
}

function tryParseJSON5(text: string): Record<string, unknown> | undefined {
  try {
    return JSON5.parse(text);
  } catch {
    return undefined;
  }
}
