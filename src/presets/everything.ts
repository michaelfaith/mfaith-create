import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { blockCspell } from '../blocks/blockCspell.ts';
import { blockEslintComments } from '../blocks/blockEslintComments.ts';
import { blockEslintJsdoc } from '../blocks/blockEslintJsdoc.ts';
import { blockEslintJsonc } from '../blocks/blockEslintJsonc.ts';
import { blockEslintMarkdown } from '../blocks/blockEslintMarkdown.ts';
import { blockEslintMarkdownLinks } from '../blocks/blockEslintMarkdownLinks.ts';
import { blockEslintMoreStyling } from '../blocks/blockEslintMoreStyling.ts';
import { blockEslintNode } from '../blocks/blockEslintNode.ts';
import { blockEslintPackageJson } from '../blocks/blockEslintPackageJson.ts';
import { blockEslintRegexp } from '../blocks/blockEslintRegexp.ts';
import { blockEslintYml } from '../blocks/blockEslintYml.ts';
import { blockKnip } from '../blocks/blockKnip.ts';
import { blockNvmrc } from '../blocks/blockNvmrc.ts';
import { blockOctoguideStrict } from '../blocks/blockOctoguideStrict.ts';
import { blockPnpmDedupe } from '../blocks/blockPnpmDedupe.ts';
import { blockRenovate } from '../blocks/blockRenovate.ts';
import { blockVscode } from '../blocks/blockVscode.ts';
import type { OptionsShape } from '../Options.ts';
import { presetCommon } from './common.ts';

export const presetEverything: Preset<OptionsShape> = base.createPreset({
  about: {
    description: 'The most comprehensive tooling imaginable: sorting, spellchecking, and more!',
    name: 'Everything',
  },
  blocks: [
    ...presetCommon.blocks,
    blockCspell,
    blockEslintComments,
    blockEslintJsdoc,
    blockEslintJsonc,
    blockEslintMarkdown,
    blockEslintMarkdownLinks,
    blockEslintMoreStyling,
    blockEslintNode,
    blockEslintPackageJson,
    blockEslintRegexp,
    blockEslintYml,
    blockKnip,
    blockNvmrc,
    blockPnpmDedupe,
    blockOctoguideStrict,
    blockRenovate,
    blockVscode,
  ],
});
