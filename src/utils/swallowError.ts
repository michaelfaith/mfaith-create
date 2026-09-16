export function swallowError<T>(value: Error | T): T | undefined {
  return value instanceof Error ? undefined : value;
}
