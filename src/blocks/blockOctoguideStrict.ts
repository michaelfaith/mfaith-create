import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockOctoguide } from './blockOctoguide.ts';

export const blockOctoguideStrict: BlockWithoutProps = base.createBlock({
  about: {
    name: 'OctoGuide Strict',
  },
  produce() {
    return {
      addons: [
        blockOctoguide({
          config: 'strict',
        }),
      ],
    };
  },
});
