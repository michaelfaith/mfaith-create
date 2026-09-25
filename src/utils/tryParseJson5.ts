import json5 from 'json5';

export function tryParseJson5(
  text: string,
): Record<string, unknown> | undefined {
  try {
    return json5.parse(text);
  } catch {
    return undefined;
  }
}
