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

      - [ ] This change addresses an existing open issue: fixes #000
      - [ ] The above issue was marked as https://github.com/test-owner/test-repository/labels/status%3A%20accepting%20prs
      - [ ] I've read the project's [Contributing Guidelines](https://github.com/test-owner/test-repository/blob/main/.github/CONTRIBUTING.md)

      ## Overview

      <!-- Description of what behaviors were changed and how this code change does that. -->
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

      - [ ] This change addresses an existing open issue: fixes #000
      - [ ] The above issue was marked as https://github.com/test-owner/test-repository/labels/status%3A%20accepting%20prs
      - [ ] I've read the project's [Contributing Guidelines](https://github.com/test-owner/test-repository/blob/main/.github/CONTRIBUTING.md)

      ## Overview

      <!-- Description of what behaviors were changed and how this code change does that. -->
      ",
          },
        },
      }
    `);
  });
});
