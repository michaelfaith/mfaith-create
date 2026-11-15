import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { formatTextLines } from './files/formatTextLines.ts';

export interface BlockGitattributesProps {
  additionalAttributes?: string[];
}

export const blockGitattributes: BlockWithProps<BlockGitattributesProps> = base.createBlock({
  about: {
    name: 'Gitattributes',
    description: 'Adds a .gitattributes file to the project.',
  },
  props: {
    additionalAttributes: z.array(z.string()).default([]),
  },
  produce({ props }) {
    const { additionalAttributes } = props;

    return {
      files: {
        '.gitattributes': `# Enforce LF endings globally across all text files on any OS
* text=auto eol=lf
${additionalAttributes.length ? formatTextLines(['\n# Additional attributes', ...additionalAttributes]) : ''}`,
      },
    };
  },
});
