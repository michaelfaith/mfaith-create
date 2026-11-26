import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { cspell } from '../blocks/cspell.ts';
import { eslintComments } from '../blocks/eslintComments.ts';
import { eslintJsdoc } from '../blocks/eslintJsdoc.ts';
import { eslintJsonc } from '../blocks/eslintJsonc.ts';
import { eslintMarkdown } from '../blocks/eslintMarkdown.ts';
import { eslintMarkdownLinks } from '../blocks/eslintMarkdownLinks.ts';
import { eslintMoreStyling } from '../blocks/eslintMoreStyling.ts';
import { blockEslintNode } from '../blocks/eslintNode.ts';
import { eslintPackageJson } from '../blocks/eslintPackageJson.ts';
import { eslintRegexp } from '../blocks/eslintRegexp.ts';
import { eslintYml } from '../blocks/eslintYml.ts';
import { knip } from '../blocks/knip.ts';
import { nvmrc } from '../blocks/nvmrc.ts';
import { renovate } from '../blocks/renovate.ts';
import { vscode } from '../blocks/vscode.ts';
import type { OptionsShape } from '../Options.ts';
import { presetCommon } from './common.ts';

export const presetEverything: Preset<OptionsShape> = base.createPreset({
  about: {
    description: 'The most comprehensive tooling imaginable: sorting, spellchecking, and more!',
    name: 'Everything',
  },
  blocks: [
    ...presetCommon.blocks,
    cspell,
    eslintComments,
    eslintJsdoc,
    eslintJsonc,
    eslintMarkdown,
    eslintMarkdownLinks,
    eslintMoreStyling,
    blockEslintNode,
    eslintPackageJson,
    eslintRegexp,
    eslintYml,
    knip,
    nvmrc,
    renovate,
    vscode,
  ],
});
