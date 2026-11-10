import { base } from '../base.ts';
import type { BlockWithoutProps } from './Block.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { formatYaml } from './files/formatYaml.ts';

export const blockGithubIssueTemplates: BlockWithoutProps = base.createBlock({
  about: {
    name: 'GitHub Issue Templates',
  },
  produce({ options }) {
    return {
      files: {
        '.github': {
          ISSUE_TEMPLATE: {
            '01-bug.yml': formatYaml({
              name: '🐛 Bug',
              description: 'Report a bug trying to run the code',
              title: '🐛 Bug: <short description of the bug>',
              labels: ['status: in discussion', 'type: bug'],
              body: [
                {
                  type: 'checkboxes',
                  attributes: {
                    description:
                      'If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!',
                    label: 'Bug Report Checklist',
                    options: [
                      {
                        label: 'I have tried restarting my IDE and the issue persists.',
                        required: true,
                      },
                      {
                        label: `I have [searched for related issues](https://github.com/${options.owner}/${options.repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
                        required: true,
                      },
                    ],
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: 'Describe what happened and what you expected to happen.',
                    label: 'Description',
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: 'input',
                  attributes: {
                    description: 'Version of this package you tried',
                    label: 'Version',
                    placeholder: '1.2.3',
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: 'input',
                  attributes: {
                    description:
                      'If possible, please create a repository that reproduces the issue with the minimal amount of code possible.',
                    label: 'Minimal Reproduction',
                    placeholder: 'https://github.com/user/repo',
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: 'Additional Info',
                  },
                },
              ],
            }),
            '02-documentation.yml': formatYaml({
              name: '📝 Documentation',
              description: 'Report a typo or missing area of documentation',
              title: '📝 Documentation: <short description of the request>',
              labels: ['area: documentation', 'status: in discussion'],
              body: [
                {
                  type: 'checkboxes',
                  attributes: {
                    description:
                      'If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!',
                    label: 'Documentation Report Checklist',
                    options: [
                      {
                        label: 'I have checked the latest `main` branch of the repository.',
                        required: true,
                      },
                      {
                        label: `I have [searched for related issues](https://github.com/${options.owner}/${options.repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
                        required: true,
                      },
                    ],
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: 'What would you like to report?',
                    label: 'Overview',
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: 'Additional Info',
                  },
                },
              ],
            }),
            '03-feature.yml': formatYaml({
              name: '🚀 Feature',
              description: 'Request that a new feature be added or an existing feature improved',
              title: '🚀 Feature: <short description of the feature>',
              labels: ['status: in discussion', 'type: feature'],
              body: [
                {
                  type: 'checkboxes',
                  attributes: {
                    description:
                      'If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!',
                    label: 'Feature Request Checklist',
                    options: [
                      {
                        label: `I have [searched for related issues](https://github.com/${options.owner}/${options.repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
                        required: true,
                      },
                    ],
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: 'What would you like to be able to do?',
                    label: 'Overview',
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: 'Additional Info',
                  },
                },
              ],
            }),
            '04-tooling.yml': formatYaml({
              name: '🛠 Tooling',
              description: 'Report a bug or request an enhancement in repository tooling',
              title: '🛠 Tooling: <short description of the change>',
              labels: ['area: tooling', 'status: in discussion'],
              body: [
                {
                  type: 'checkboxes',
                  attributes: {
                    description:
                      'If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!',
                    label: 'Tooling Report Checklist',
                    options: [
                      {
                        label: 'I have tried restarting my IDE and the issue persists.',
                        required: true,
                      },
                      {
                        label: 'I have pulled the latest `main` branch of the repository.',
                        required: true,
                      },
                      {
                        label: `I have [searched for related issues](https://github.com/${options.owner}/${options.repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
                        required: true,
                      },
                    ],
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: 'What tooling changes would you like to make?',
                    label: 'Overview',
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: 'textarea',
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: 'Additional Info',
                  },
                },
              ],
            }),
          },
        },
      },
    };
  },
  transition() {
    return {
      extensions: [
        blockRemoveFiles({
          files: [
            '.github/ISSUE_TEMPLATE.md',
            '.github/ISSUE_TEMPLATE/01-bug.yaml',
            '.github/ISSUE_TEMPLATE/02-documentation.yaml',
            '.github/ISSUE_TEMPLATE/03-feature.yaml',
            '.github/ISSUE_TEMPLATE/04-tooling.yaml',
          ],
        }),
      ],
    };
  },
});
