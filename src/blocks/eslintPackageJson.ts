import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockEslint } from './eslint.ts';
import { blockPackageJson } from './packageJson.ts';
import { blockRemoveDependencies } from './removeDependencies.ts';
import { blockRemoveFiles } from './removeFiles.ts';
import { blockRemoveWorkflows } from './removeWorkflows.ts';

export const blockEslintPackageJson: BlockWithoutProps = base.createBlock({
  about: {
    name: 'ESLint package.json Plugin',
  },
  produce() {
    return {
      extensions: [
        blockEslint({
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
        blockPackageJson({
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
        blockRemoveFiles({
          files: ['.npmpackagejsonlintrc*'],
        }),
        blockRemoveDependencies({
          dependencies: ['npm-package-json-lint', 'npm-package-json-lint-config-default'],
        }),
        blockRemoveWorkflows({
          workflows: ['lint-package-json'],
        }),
      ],
    };
  },
});
