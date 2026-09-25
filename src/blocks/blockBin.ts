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

const makeBinPathsRelative = (bin: Bin): Bin => {
  if (typeof bin === 'string') {
    return makeRelativePath(bin);
  } else {
    return Object.fromEntries(
      Object.entries(bin).map(([key, value]) => [key, makeRelativePath(value)]),
    );
  }
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
    const { devExports, emoji } = options;

    let bin: string | Record<string, string>;
    if (typeof src === 'string') {
      bin = srcToDist(src);
    } else {
      bin = Object.fromEntries(
        Object.entries(src).map(([key, value]) => [key, srcToDist(value)]),
      );
    }

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
            bin: devExports
              ? makeBinPathsRelative(src)
              : makeBinPathsRelative(bin),
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
        ...(devExports
          ? [blockPublishConfig({ bin: makeBinPathsRelative(bin) })]
          : []),
        blockTsdown({
          entry: typeof src === 'string' ? [src] : Object.values(src),
        }),
      ],
    };
  },
});
