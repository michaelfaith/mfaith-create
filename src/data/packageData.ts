import packageData from '../../package.json' with { type: 'json' };

export { packageData };

export function getPackageDependencies(
  ...names: string[]
): Record<string, string> {
  return Object.fromEntries(
    names.map((name) => {
      return [name, getPackageDependency(name)];
    }),
  );
}

function getPackageDependency(name: string): string {
  const version =
    getPackageInner('devDependencies', name) ??
    getPackageInner('dependencies', name);

  if (!version) {
    throw new Error(
      `'${name}' is neither in package.json's dependencies nor its devDependencies.`,
    );
  }

  return version;
}

function getPackageInner(
  key: 'dependencies' | 'devDependencies',
  name: string,
): string | undefined {
  const inner = packageData[key];

  return inner[name as keyof typeof inner];
}
