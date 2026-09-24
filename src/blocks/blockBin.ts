import { base } from '../base.ts';
import { makeRelativePath } from '../utils/makeRelativePath.ts';
import { blockEslint } from './blockEslint.ts';
import { blockExampleFiles } from './blockExampleFiles.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPublishConfig } from './blockPublishConfig.ts';
import { blockTsdown } from './blockTsdown.ts';
import { JS_TS_FILES } from './eslint/globs.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';
import { type Bin, binSchema } from './packageJson/schemas.ts';

const tsExtensionRegex = /(.*)\.[cm]?ts$/i;
const jsExtensionRegex = /(.*)\.[cm]?js$/i;

const srcToDist = (value: string) =>
  value.replace('src', 'dist').replace(tsExtensionRegex, '$1.mjs');
const distToSrc = (value: string) =>
  value.replace('dist', 'src').replace(jsExtensionRegex, '$1.ts');

const convertToCommand = (packageName: string): string => {
  const parts = packageName.split('/');
  return parts.length > 1 ? parts[1] : parts[0];
};

const createExplicitBin = (
  binPath: string,
  packageName: string,
): Record<string, string> => {
  const binCommand = convertToCommand(packageName);
  return { [binCommand]: binPath };
};

const prepareBin = (
  input: Bin,
  packageName: string,
  transformPath = (binPath: string) => binPath,
): Record<string, string> => {
  if (typeof input === 'string') {
    return createExplicitBin(
      makeRelativePath(transformPath(input)),
      packageName,
    );
  }

  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      makeRelativePath(transformPath(value)),
    ]),
  );
};

export const blockBin = base.createBlock({
  about: {
    name: 'Bin',
    description:
      'Adds a `bin` entry in the `package.json` for any bin scripts that the package should expose.',
  },
  addons: {
    src: binSchema.optional(),
  },
  intake({ files }) {
    const raw = intakeFileAsJson(files, ['package.json']);
    const { data } = binSchema.safeParse(raw?.bin);
    if (!data) {
      return undefined;
    }

    let src: string | Record<string, string>;
    if (typeof data === 'string') {
      src = distToSrc(data);
    } else {
      src = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, distToSrc(value)]),
      );
    }

    return {
      src,
    };
  },
  produce({ addons, options }) {
    const { src = './src/bin/index.ts' } = addons;
    const { devExports, emoji, packageName, repository } = options;

    const srcBin = prepareBin(src, packageName ?? repository);
    const bin = prepareBin(src, packageName ?? repository, srcToDist);
    const binEntries = typeof src === 'string' ? [src] : Object.values(src);

    return {
      addons: [
        blockEslint({
          extensions: [
            {
              files: JS_TS_FILES,
              rules: [
                {
                  comment: 'Using a ts bin file throws this rule off.',
                  entries: { 'n/hashbang': 'off' as const },
                },
              ],
            },
          ],
        }),
        blockPackageJson({
          properties: {
            bin: devExports ? srcBin : bin,
          },
        }),
        blockExampleFiles({
          files: {
            bin: {
              'index.ts': `#!/usr/bin/env node
import { greet } from '../index.ts';

greet('Hello, world! ${emoji}');`,
            },
          },
        }),
        ...(devExports ? [blockPublishConfig({ bin })] : []),
        blockTsdown({
          entry: binEntries,
          excludeFromExports: binEntries,
        }),
      ],
    };
  },
});
