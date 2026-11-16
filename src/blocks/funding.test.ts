import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { funding } from './funding.ts';
import { optionsBase } from './options.fakes.ts';
import { blockRemoveFiles } from './removeFiles.ts';

describe(funding, () => {
  test('transition mode', () => {
    const creation = testBlock(funding, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation.extensions).toContainEqual(
      blockRemoveFiles({ files: ['.github/FUNDING.yaml'] }),
    );
  });
});
