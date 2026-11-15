import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { blockAllContributors } from '../blocks/allContributors.ts';
import { blockFunding } from '../blocks/blockFunding.ts';
import { blockCodecov } from '../blocks/codecov.ts';
import { blockOctoguide } from '../blocks/octoguide.ts';
import { blockPrPreviewRelease } from '../blocks/prPreviewRelease.ts';
import { blockReleasePlease } from '../blocks/releasePlease.ts';
import { blockVitest } from '../blocks/vitest.ts';
import type { OptionsShape } from '../Options.ts';
import { presetMinimal } from './minimal.ts';

export const presetCommon: Preset<OptionsShape> = base.createPreset({
  about: {
    description:
      'Base starter blocks plus testing, code coverage, automation for all-contributors, pr preview publishing, and releases.',
    name: 'Common',
  },
  blocks: [
    ...presetMinimal.blocks,
    blockAllContributors,
    blockCodecov,
    blockFunding,
    blockOctoguide,
    blockPrPreviewRelease,
    blockReleasePlease,
    blockVitest,
  ],
});
