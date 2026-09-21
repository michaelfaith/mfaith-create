import { base } from '../base.ts';
import { blockGithubApps } from './blockGithubApps.ts';
import { blockReadme } from './blockReadme.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { blockVitest } from './blockVitest.ts';
import { resolveUses } from './workflows/resolveUses.ts';

export const blockCodecov = base.createBlock({
  about: {
    name: 'Codecov',
  },
  produce({ options }) {
    const actionStep = {
      uses: resolveUses(
        'codecov/codecov-action',
        'v7',
        options.workflowsVersions,
      ),
      if: `success() && (matrix.os == 'ubuntu-latest')`,
      with: {
        fail_ci_if_error: true,
        use_oidc: true,
      },
    };

    return {
      addons: [
        blockGithubApps({
          apps: [
            {
              name: 'Codecov',
              url: 'https://github.com/apps/codecov',
            },
          ],
        }),
        blockReadme({
          badges: [
            {
              alt: '🧪 Coverage',
              href: `https://codecov.io/gh/${options.owner}/${options.repository}`,
              src: `https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage`,
            },
          ],
        }),
        blockVitest({
          actionSteps: [actionStep],
          permissions: {
            'id-token': 'write',
          },
        }),
      ],
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveFiles({
          files: ['.github/codecov.{yaml,yml}', 'codecov.{yaml,yml}'],
        }),
      ],
    };
  },
});
