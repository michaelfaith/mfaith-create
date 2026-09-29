import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockGithubPrTemplate } from './blockGithubPrTemplate.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockGithubPrTemplate', () => {
  test('production', () => {
    const creation = testBlock(blockGithubPrTemplate, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "PULL_REQUEST_TEMPLATE.md": "<!-- 👋 Hi, thanks for contributing to test-package-name! ✨
      Please fill out all fields below and make sure each item is true and [x] checked.
      Otherwise we may not be able to review your PR. -->

      ## PR Checklist

      - [ ] Addresses an existing open issue: fixes #000
      - [ ] That issue was marked as [\`status: accepting prs\`](https://github.com/test-owner/test-repository/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+accepting+prs%22)
      - [ ] Steps in [CONTRIBUTING.md](https://github.com/test-owner/test-repository/blob/main/.github/CONTRIBUTING.md) were taken

      ## Overview

      <!-- Description of what is changed and how the code change does that. -->
      ",
          },
        },
      }
    `);
  });

  test('production (with no packageName)', () => {
    const creation = testBlock(blockGithubPrTemplate, {
      options: { ...optionsBase, packageName: undefined },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "PULL_REQUEST_TEMPLATE.md": "<!-- 👋 Hi, thanks for contributing to test-repository! ✨
      Please fill out all fields below and make sure each item is true and [x] checked.
      Otherwise we may not be able to review your PR. -->

      ## PR Checklist

      - [ ] Addresses an existing open issue: fixes #000
      - [ ] That issue was marked as [\`status: accepting prs\`](https://github.com/test-owner/test-repository/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+accepting+prs%22)
      - [ ] Steps in [CONTRIBUTING.md](https://github.com/test-owner/test-repository/blob/main/.github/CONTRIBUTING.md) were taken

      ## Overview

      <!-- Description of what is changed and how the code change does that. -->
      ",
          },
        },
      }
    `);
  });
});
