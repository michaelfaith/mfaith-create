import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';

export const blockGithubPrTemplate: BlockWithoutProps = base.createBlock({
  about: {
    name: 'GitHub PR Template',
    description: 'Creates a GitHub PR Template for the repo.',
  },
  produce({ options }) {
    return {
      files: {
        '.github': {
          'PULL_REQUEST_TEMPLATE.md': `<!-- 👋 Hi, thanks for contributing to ${options.packageName || options.repository}! ${options.emoji}
Please fill out all fields below and make sure each item is true and [x] checked.
Otherwise we may not be able to review your PR. -->

## PR Checklist

- [ ] This change addresses an existing open issue: fixes #000
- [ ] The above issue was marked as https://github.com/${options.owner}/${options.repository}/labels/status%3A%20accepting%20prs
- [ ] I've read the project's [Contributing Guidelines](https://github.com/${options.owner}/${options.repository}/blob/main/.github/CONTRIBUTING.md)

## Overview

<!-- Description of what behaviors were changed and how this code change does that. -->
`,
        },
      },
    };
  },
});
