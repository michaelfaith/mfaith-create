import { base } from '../base.ts';
import { blockOctoguide } from './blockOctoguide.ts';

export const blockOctoguideStrict = base.createBlock({
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
