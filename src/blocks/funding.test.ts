import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockFunding } from './funding.ts';
import { optionsBase } from './options.fakes.ts';
import { blockRemoveFiles } from './removeFiles.ts';

describe(blockFunding, () => {
  test('transition mode', () => {
    const creation = testBlock(blockFunding, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation.extensions).toContainEqual(
      blockRemoveFiles({ files: ['.github/FUNDING.yaml'] }),
    );
  });
});
