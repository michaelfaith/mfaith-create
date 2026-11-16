import { base } from '../base.ts';
import { getPackageDependencies } from '../data/packageData.ts';
import type { BlockWithoutProps } from './Block.ts';
import { packageJson } from './packageJson.ts';
import { tsdown } from './tsdown.ts';

export const areTheTypesWrong: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Are the Types Wrong',
    description: 'Enables type validation for builds.',
  },
  produce() {
    return {
      extensions: [
        packageJson({
          properties: {
            devDependencies: getPackageDependencies('@arethetypeswrong/core'),
          },
        }),
        tsdown({
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
