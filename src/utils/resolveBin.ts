import { findUpSync } from 'find-up-simple';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface PackageJson {
  bin?: string | Record<string, string>;
}

const cache = new Map<string, string>();
const cacheKeyDelimiter = ':~:';

/** @internal */
export const clearCache = (): void => {
  cache.clear();
};

export const resolveBin = (
  packageName: string,
  binName = packageName,
): string => {
  const cacheKey = [packageName, binName].join(cacheKeyDelimiter);
  const cachedValue = cache.get(cacheKey);
  if (cachedValue) {
    return cachedValue;
  }

  let packageJsonPath: string | undefined;
  try {
    const packageJsonUrl = import.meta.resolve(`${packageName}/package.json`);
    packageJsonPath = fileURLToPath(packageJsonUrl);
  } catch {
    // If the `package.json` of the package isn't exported, try and find it from the
    // primary export.
    const packageResolutionPath = import.meta.resolve(packageName);
    packageJsonPath = findUpSync('package.json', {
      cwd: dirname(packageResolutionPath),
    });
  }

  if (!packageJsonPath) {
    throw new Error(`Unable to load "${packageName}" bin for execution`);
  }

  const packageRoot = dirname(packageJsonPath);
  const packageJson = JSON.parse(
    readFileSync(packageJsonPath, 'utf8'),
  ) as PackageJson;

  const bin =
    typeof packageJson.bin === 'string'
      ? packageJson.bin
      : packageJson.bin?.[binName];

  if (!bin) {
    throw new Error(`Package "${packageName}" has no bin named "${binName}".`);
  }

  const binPath = resolve(packageRoot, bin);
  cache.set(cacheKey, binPath);
  return binPath;
};
