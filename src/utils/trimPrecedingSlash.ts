export function trimPrecedingSlash(
  filePath: string | undefined,
): string | undefined {
  return filePath?.replace(/^\.\//, '');
}
