export function formatIgnoreFile(lines: (string | undefined)[]): string {
  return [...lines.filter(Boolean), ''].join('\n');
}
