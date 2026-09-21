import { base } from '../base.ts';
import { blockCodeOfConduct } from '../blocks/blockCodeOfConduct.ts';
import { blockContributingDocs } from '../blocks/blockContributingDocs.ts';
import { blockDevelopmentDocs } from '../blocks/blockDevelopmentDocs.ts';
import { blockEslint } from '../blocks/blockEslint.ts';
import { blockExampleFiles } from '../blocks/blockExampleFiles.ts';
import { blockExports } from '../blocks/blockExports.ts';
import { blockGithubActionsCi } from '../blocks/blockGithubActionsCi.ts';
import { blockGithubApps } from '../blocks/blockGithubApps.ts';
import { blockGithubIssueTemplates } from '../blocks/blockGithubIssueTemplates.ts';
import { blockGithubPrTemplate } from '../blocks/blockGithubPrTemplate.ts';
import { blockGitignore } from '../blocks/blockGitignore.ts';
import { blockMitLicense } from '../blocks/blockMitLicense.ts';
import { blockPackageJson } from '../blocks/blockPackageJson.ts';
import { blockPnpmWorkspace } from '../blocks/blockPnpmWorkspace.ts';
import { blockPrettier } from '../blocks/blockPrettier.ts';
import { blockReadme } from '../blocks/blockReadme.ts';
import { blockRemoveDependencies } from '../blocks/blockRemoveDependencies.ts';
import { blockRemoveFiles } from '../blocks/blockRemoveFiles.ts';
import { blockRemoveWorkflows } from '../blocks/blockRemoveWorkflows.ts';
import { blockRepositoryBranchRuleset } from '../blocks/blockRepositoryBranchRuleset.ts';
import { blockRepositoryLabels } from '../blocks/blockRepositoryLabels.ts';
import { blockRepositorySecrets } from '../blocks/blockRepositorySecrets.ts';
import { blockRepositorySettings } from '../blocks/blockRepositorySettings.ts';
import { blockSecurityDocs } from '../blocks/blockSecurityDocs.ts';
import { blockSideEffects } from '../blocks/blockSideEffects.ts';
import { blockTemplatedWith } from '../blocks/blockTemplatedWith.ts';
import { blockTsdown } from '../blocks/blockTsdown.ts';
import { blockTypescript } from '../blocks/blockTypescript.ts';

export const presetMinimal = base.createPreset({
  about: {
    description:
      'Just bare starter tooling: building, formatting, linting, and type checking.',
    name: 'Minimal',
  },
  blocks: [
    blockContributingDocs,
    blockCodeOfConduct,
    blockDevelopmentDocs,
    blockEslint,
    blockExports,
    blockExampleFiles,
    blockGithubActionsCi,
    blockGithubApps,
    blockGithubIssueTemplates,
    blockGithubPrTemplate,
    blockGitignore,
    blockMitLicense,
    blockPackageJson,
    blockPnpmWorkspace,
    blockPrettier,
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
