import { base } from '../base.ts';
import { blockAllContributors } from '../blocks/blockAllContributors.ts';
import { blockCodecov } from '../blocks/blockCodecov.ts';
import { blockFunding } from '../blocks/blockFunding.ts';
import { blockOctoguide } from '../blocks/blockOctoguide.ts';
import { blockPrPreviewRelease } from '../blocks/blockPrPreviewRelease.ts';
import { blockReleasePlease } from '../blocks/blockReleasePlease.ts';
import { blockVitest } from '../blocks/blockVitest.ts';
import { presetMinimal } from './minimal.ts';

export const presetCommon = base.createPreset({
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
