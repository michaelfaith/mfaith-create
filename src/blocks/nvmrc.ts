import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { oxfmt } from './oxfmt.ts';
import { prettier } from './prettier.ts';

export const nvmrc: BlockWithoutProps = base.createBlock({
  about: {
    name: 'nvmrc',
  },
  produce({ options }) {
    return {
      extensions: [
        oxfmt({
          overrides: [{ files: ['.nvmrc'], options: { parser: 'yaml' } }],
        }),
        prettier({
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
