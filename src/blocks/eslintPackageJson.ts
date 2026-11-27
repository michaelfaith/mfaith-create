import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { eslint } from './eslint.ts';
import { packageJson } from './packageJson.ts';
import { removeDependencies } from './removeDependencies.ts';
import { removeFiles } from './removeFiles.ts';
import { removeWorkflows } from './removeWorkflows.ts';

export const eslintPackageJson: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint package.json Plugin',
  },
  produce() {
    return {
      extensions: [
        eslint({
          extensions: [
            {
              extends: ['packageJson.configs.recommended', 'packageJson.configs.stylistic'],
              files: ['package.json'],
            },
          ],
          imports: [
            {
              source: 'eslint-plugin-package-json',
              specifier: 'packageJson',
            },
          ],
        }),
        packageJson({
          properties: {
            scripts: {
              'lint:package-json': undefined,
            },
          },
        }),
      ],
    };
  },
  transition() {
    return {
      extensions: [
        removeFiles({
          files: ['.npmpackagejsonlintrc*'],
        }),
        removeDependencies({
          dependencies: ['npm-package-json-lint', 'npm-package-json-lint-config-default'],
        }),
        removeWorkflows({
          workflows: ['lint-package-json'],
        }),
      ],
    };
  },
});
