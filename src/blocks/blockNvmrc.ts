import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockOxfmt } from './blockOxfmt.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockNvmrc: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Nvmrc',
  },
  produce({ options }) {
    return {
      addons: [
        blockOxfmt({
          overrides: [{ files: ['.nvmrc'], options: { parser: 'yaml' } }],
        }),
        blockPrettier({
          overrides: [{ files: '.nvmrc', options: { parser: 'yaml' } }],
        }),
      ],
      ...(options.node.pinned && {
        files: {
          '.nvmrc': `${options.node.pinned}\n`,
        },
      }),
    };
  },
});
