import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockGithubIssueTemplates } from './blockGithubIssueTemplates.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockGithubIssueTemplates', () => {
  test('transition mode', () => {
    const creation = testBlock(blockGithubIssueTemplates, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation.addons).toContainEqual(
      blockRemoveFiles({
        files: [
          '.github/ISSUE_TEMPLATE/01-bug.yml',
          '.github/ISSUE_TEMPLATE/02-documentation.yml',
          '.github/ISSUE_TEMPLATE/03-feature.yml',
          '.github/ISSUE_TEMPLATE/04-tooling.yml',
        ],
      }),
    );
  });
});
