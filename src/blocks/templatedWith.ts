import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { readme } from './readme.ts';

export const templatedWith: BlockWithoutProps = base.createBlock({
  about: {
    name: 'Templated With',
  },
  produce({ options }) {
    return {
      extensions: [
        readme({
          notices: [
            options.owner !== 'michaelfaith' &&
              `
<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
            `> 💝 This package was templated with [\`@mfaith/create\`](https://github.com/michaelfaith/mfaith-create) using the [Bingo framework](https://create.bingo).
`,
          ].filter((notice) => typeof notice === 'string'),
        }),
      ],
    };
  },
});
