import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { blockCspell } from '../blocks/blockCspell.ts';
import { blockEslintComments } from '../blocks/eslintComments.ts';
import { blockEslintJsdoc } from '../blocks/eslintJsdoc.ts';
import { blockEslintJsonc } from '../blocks/eslintJsonc.ts';
import { blockEslintMarkdown } from '../blocks/eslintMarkdown.ts';
import { blockEslintMarkdownLinks } from '../blocks/eslintMarkdownLinks.ts';
import { blockEslintMoreStyling } from '../blocks/eslintMoreStyling.ts';
import { blockEslintNode } from '../blocks/eslintNode.ts';
import { blockEslintPackageJson } from '../blocks/eslintPackageJson.ts';
import { blockEslintRegexp } from '../blocks/eslintRegexp.ts';
import { blockEslintYml } from '../blocks/eslintYml.ts';
import { blockKnip } from '../blocks/knip.ts';
import { blockNvmrc } from '../blocks/nvmrc.ts';
import { blockPnpmDedupe } from '../blocks/pnpmDedupe.ts';
import { blockRenovate } from '../blocks/renovate.ts';
import { blockVscode } from '../blocks/vscode.ts';
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
    blockRenovate,
    blockVscode,
  ],
});
