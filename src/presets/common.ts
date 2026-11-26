import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { allContributors } from '../blocks/allContributors.ts';
import { codecov } from '../blocks/codecov.ts';
import { funding } from '../blocks/funding.ts';
import { octoguide } from '../blocks/octoguide.ts';
import { pnpmDedupe } from '../blocks/pnpmDedupe.ts';
import { prPreviewRelease } from '../blocks/prPreviewRelease.ts';
import { releasePlease } from '../blocks/releasePlease.ts';
import { vitest } from '../blocks/vitest.ts';
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
    funding,
    octoguide,
    pnpmDedupe,
    prPreviewRelease,
    releasePlease,
    vitest,
  ],
});
