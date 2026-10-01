import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockTsdown } from './blockTsdown.ts';

export const blockAreTheTypesWrong: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Are the Types Wrong',
    description: 'Enables type validation for builds.',
  },
  produce() {
    return {
      addons: [
        blockPackageJson({
          properties: {
            devDependencies: getPackageDependencies('@arethetypeswrong/core'),
          },
        }),
        blockTsdown({
          attw: {
            enabled: 'ci-only',
            level: 'error',
            profile: 'esm-only',
          },
        }),
      ],
    };
  },
});
