export function getInstallationSuggestions(
  description: string,
  entries: string[],
  url: string,
): string[] | undefined {
  return entries.length
    ? [
        [
          `- ${description}`,
          entries.length === 1 ? '' : 's',
          ` on ${url}:\n`,
          entries.map((entry) => `   - ${entry}`).join('\n'),
        ].join(''),
      ]
    : undefined;
}
