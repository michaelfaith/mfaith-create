import type { Preset } from 'bingo-stratum';

import { base } from '../base.ts';
import { codeOfConduct } from '../blocks/codeOfConduct.ts';
import { contributingDocs } from '../blocks/contributingDocs.ts';
import { developmentDocs } from '../blocks/developmentDocs.ts';
import { eslint } from '../blocks/eslint.ts';
import { blockExampleFiles } from '../blocks/exampleFiles.ts';
import { exports } from '../blocks/exports.ts';
import { gitattributes } from '../blocks/gitattributes.ts';
import { githubActionsCi } from '../blocks/githubActionsCi.ts';
import { githubApps } from '../blocks/githubApps.ts';
import { githubIssueTemplates } from '../blocks/githubIssueTemplates.ts';
import { githubPrTemplate } from '../blocks/githubPrTemplate.ts';
import { gitignore } from '../blocks/gitignore.ts';
import { mitLicense } from '../blocks/mitLicense.ts';
import { oxfmt } from '../blocks/oxfmt.ts';
import { packageJson } from '../blocks/packageJson.ts';
import { pnpmWorkspace } from '../blocks/pnpmWorkspace.ts';
import { blockPublishConfig } from '../blocks/publishConfig.ts';
import { readme } from '../blocks/readme.ts';
import { blockRemoveDependencies } from '../blocks/removeDependencies.ts';
import { removeFiles } from '../blocks/removeFiles.ts';
import { blockRemoveWorkflows } from '../blocks/removeWorkflows.ts';
import { blockRepositoryBranchRuleset } from '../blocks/repositoryBranchRuleset.ts';
import { blockRepositoryLabels } from '../blocks/repositoryLabels.ts';
import { blockRepositorySecrets } from '../blocks/repositorySecrets.ts';
import { blockRepositorySettings } from '../blocks/repositorySettings.ts';
import { securityDocs } from '../blocks/securityDocs.ts';
import { sideEffects } from '../blocks/sideEffects.ts';
import { templatedWith } from '../blocks/templatedWith.ts';
import { tsdown } from '../blocks/tsdown.ts';
import { typescript } from '../blocks/typescript.ts';
import type { OptionsShape } from '../Options.ts';

export const presetMinimal: Preset<OptionsShape> = base.createPreset({
  about: {
    description: 'Just bare starter tooling: building, formatting, linting, and type checking.',
    name: 'Minimal',
  },
  blocks: [
    contributingDocs,
    codeOfConduct,
    developmentDocs,
    eslint,
    blockExampleFiles,
    exports,
    gitattributes,
    githubActionsCi,
    githubApps,
    githubIssueTemplates,
    githubPrTemplate,
    gitignore,
    mitLicense,
    packageJson,
    pnpmWorkspace,
    oxfmt,
    blockPublishConfig,
    readme,
    blockRemoveDependencies,
    removeFiles,
    blockRemoveWorkflows,
    blockRepositoryBranchRuleset,
    blockRepositoryLabels,
    blockRepositorySecrets,
    blockRepositorySettings,
    securityDocs,
    sideEffects,
    templatedWith,
    tsdown,
    typescript,
  ],
});
