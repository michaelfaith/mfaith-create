import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockGithubIssueTemplates } from './blockGithubIssueTemplates.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockGithubIssueTemplates, () => {
  test('production', () => {
    const creation = testBlock(blockGithubIssueTemplates, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "ISSUE_TEMPLATE": {
              "01-bug.yml": "name: 🐛 Bug

      description: Report a bug trying to run the code

      title: '🐛 Bug: <short description of the bug>'

      labels:
        - 'status: in discussion'
        - 'type: bug'

      body:
        - type: checkboxes
          attributes:
            description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
            label: Bug Report Checklist
            options:
              - label: I have tried restarting my IDE and the issue persists.
                required: true
              - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
                required: true
        - type: textarea
          attributes:
            description: Describe what happened and what you expected to happen.
            label: Description
          validations:
            required: true
        - type: input
          attributes:
            description: Version of this package you tried
            label: Version
            placeholder: 1.2.3
          validations:
            required: true
        - type: input
          attributes:
            description: If possible, please create a repository that reproduces the issue with the minimal amount of code possible.
            label: Minimal Reproduction
            placeholder: https://github.com/user/repo
        - type: textarea
          attributes:
            description: Any additional info you'd like to provide.
            label: Additional Info
      ",
              "02-documentation.yml": "name: 📝 Documentation

      description: Report a typo or missing area of documentation

      title: '📝 Documentation: <short description of the request>'

      labels:
        - 'area: documentation'
        - 'status: in discussion'

      body:
        - type: checkboxes
          attributes:
            description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
            label: Documentation Report Checklist
            options:
              - label: I have checked the latest \`main\` branch of the repository.
                required: true
              - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
                required: true
        - type: textarea
          attributes:
            description: What would you like to report?
            label: Overview
          validations:
            required: true
        - type: textarea
          attributes:
            description: Any additional info you'd like to provide.
            label: Additional Info
      ",
              "03-feature.yml": "name: 🚀 Feature

      description: Request that a new feature be added or an existing feature improved

      title: '🚀 Feature: <short description of the feature>'

      labels:
        - 'status: in discussion'
        - 'type: feature'

      body:
        - type: checkboxes
          attributes:
            description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
            label: Feature Request Checklist
            options:
              - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
                required: true
        - type: textarea
          attributes:
            description: What would you like to be able to do?
            label: Overview
          validations:
            required: true
        - type: textarea
          attributes:
            description: Any additional info you'd like to provide.
            label: Additional Info
      ",
              "04-tooling.yml": "name: 🛠 Tooling

      description: Report a bug or request an enhancement in repository tooling

      title: '🛠 Tooling: <short description of the change>'

      labels:
        - 'area: tooling'
        - 'status: in discussion'

      body:
        - type: checkboxes
          attributes:
            description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
            label: Tooling Report Checklist
            options:
              - label: I have tried restarting my IDE and the issue persists.
                required: true
              - label: I have pulled the latest \`main\` branch of the repository.
                required: true
              - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
                required: true
        - type: textarea
          attributes:
            description: What tooling changes would you like to make?
            label: Overview
          validations:
            required: true
        - type: textarea
          attributes:
            description: Any additional info you'd like to provide.
            label: Additional Info
      ",
            },
          },
        },
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockGithubIssueTemplates, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation.extensions).toContainEqual(
      blockRemoveFiles({
        files: [
          '.github/ISSUE_TEMPLATE.md',
          '.github/ISSUE_TEMPLATE/01-bug.yaml',
          '.github/ISSUE_TEMPLATE/02-documentation.yaml',
          '.github/ISSUE_TEMPLATE/03-feature.yaml',
          '.github/ISSUE_TEMPLATE/04-tooling.yaml',
        ],
      }),
    );
  });
});
