import packageData from '../../package.json' with { type: 'json' };

export { packageData };

export function getPackageDependencies(...names: string[]): Record<string, string> {
  return Object.fromEntries(
    names.map((name) => {
      return [name, getPackageDependency(name)];
    }),
  );
}

export function getPackageDevDependencies(...names: string[]): Record<string, string> {
  return Object.fromEntries(
    names.map((name) => {
      return [name, getVersionForDevDependency(name)];
    }),
  );
}

export function getPackageDependency(name: string): string {
  const version = getPackageInner('devDependencies', name) ?? getPackageInner('dependencies', name);

  if (!version) {
    throw new Error(`'${name}' is neither in package.json's dependencies nor its devDependencies.`);
  }

  return version;
}

export function getVersionForDevDependency(name: string): string {
  return getPackageDependency(name).replace(/^[\^~]/, '');
}

function getPackageInner(
  key: 'dependencies' | 'devDependencies',
  name: string,
): string | undefined {
  const inner = packageData[key];

  return inner[name as keyof typeof inner];
}
