import { parse } from 'json5';

export function tryParseJson5(
  text: string,
): Record<string, unknown> | undefined {
  try {
    return parse(text);
  } catch {
    return undefined;
  }
}
