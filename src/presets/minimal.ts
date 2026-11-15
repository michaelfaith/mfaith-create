import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { blockCodeOfConduct } from '../blocks/blockCodeOfConduct.ts';
import { blockContributingDocs } from '../blocks/blockContributingDocs.ts';
import { blockDevelopmentDocs } from '../blocks/blockDevelopmentDocs.ts';
import { blockEslint } from '../blocks/blockEslint.ts';
import { blockExampleFiles } from '../blocks/blockExampleFiles.ts';
import { blockExports } from '../blocks/blockExports.ts';
import { blockGitattributes } from '../blocks/blockGitattributes.ts';
import { blockGithubActionsCi } from '../blocks/blockGithubActionsCi.ts';
import { blockGithubApps } from '../blocks/blockGithubApps.ts';
import { blockGithubIssueTemplates } from '../blocks/blockGithubIssueTemplates.ts';
import { blockGithubPrTemplate } from '../blocks/blockGithubPrTemplate.ts';
import { blockGitignore } from '../blocks/blockGitignore.ts';
import { blockMitLicense } from '../blocks/blockMitLicense.ts';
import { blockOxfmt } from '../blocks/blockOxfmt.ts';
import { blockPackageJson } from '../blocks/blockPackageJson.ts';
import { blockPnpmWorkspace } from '../blocks/pnpmWorkspace.ts';
import { blockPublishConfig } from '../blocks/publishConfig.ts';
import { blockReadme } from '../blocks/readme.ts';
import { blockRemoveDependencies } from '../blocks/removeDependencies.ts';
import { blockRemoveFiles } from '../blocks/removeFiles.ts';
import { blockRemoveWorkflows } from '../blocks/removeWorkflows.ts';
import { blockRepositoryBranchRuleset } from '../blocks/repositoryBranchRuleset.ts';
import { blockRepositoryLabels } from '../blocks/repositoryLabels.ts';
import { blockRepositorySecrets } from '../blocks/repositorySecrets.ts';
import { blockRepositorySettings } from '../blocks/repositorySettings.ts';
import { blockSecurityDocs } from '../blocks/securityDocs.ts';
import { blockSideEffects } from '../blocks/sideEffects.ts';
import { blockTemplatedWith } from '../blocks/templatedWith.ts';
import { blockTsdown } from '../blocks/tsdown.ts';
import { blockTypescript } from '../blocks/typescript.ts';
import type { OptionsShape } from '../Options.ts';

export const presetMinimal: Preset<OptionsShape> = base.createPreset({
  about: {
    description: 'Just bare starter tooling: building, formatting, linting, and type checking.',
    name: 'Minimal',
  },
  blocks: [
    blockContributingDocs,
    blockCodeOfConduct,
    blockDevelopmentDocs,
    blockEslint,
    blockExampleFiles,
    blockExports,
    blockGitattributes,
    blockGithubActionsCi,
    blockGithubApps,
    blockGithubIssueTemplates,
    blockGithubPrTemplate,
    blockGitignore,
    blockMitLicense,
    blockPackageJson,
    blockPnpmWorkspace,
    blockOxfmt,
    blockPublishConfig,
    blockReadme,
    blockRemoveDependencies,
    blockRemoveFiles,
    blockRemoveWorkflows,
    blockRepositoryBranchRuleset,
    blockRepositoryLabels,
    blockRepositorySecrets,
    blockRepositorySettings,
    blockSecurityDocs,
    blockSideEffects,
    blockTemplatedWith,
    blockTsdown,
    blockTypescript,
  ],
});
