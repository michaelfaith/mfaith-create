export function getPrimaryBin(
  bin: Record<string, string | undefined> | string | undefined,
  repository: string,
): string | undefined {
  return typeof bin === 'object' ? bin[repository] : bin;
}
