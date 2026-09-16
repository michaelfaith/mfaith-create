export function removeUsesQuotes(original: string): string {
  return original.replaceAll(/ uses: '.+'/gu, (line) =>
    line.replaceAll("'", ''),
  );
}
