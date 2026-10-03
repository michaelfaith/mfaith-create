export function formatTextLines(lines: (string | undefined)[]): string {
  return [...lines.filter(Boolean), ''].join('\n');
}
