export const sortKeys = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).sort(([key1], [key2]) => key1.localeCompare(key2)),
  ) as T;
};
