export async function swallowErrorAsync<T>(
  task: Promise<T>,
): Promise<T | undefined> {
  try {
    return await task;
  } catch {
    return undefined;
  }
}
