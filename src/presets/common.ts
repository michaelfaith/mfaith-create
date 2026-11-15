import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { allContributors } from '../blocks/allContributors.ts';
import { codecov } from '../blocks/codecov.ts';
import { blockFunding } from '../blocks/funding.ts';
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
    allContributors,
    codecov,
    blockFunding,
    blockOctoguide,
    blockPrPreviewRelease,
    blockReleasePlease,
    blockVitest,
  ],
});
