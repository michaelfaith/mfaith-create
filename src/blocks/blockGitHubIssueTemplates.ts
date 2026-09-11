import { base } from "../base.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { formatYaml } from "./files/formatYaml.ts";

export const blockGitHubIssueTemplates = base.createBlock({
  about: {
    name: "GitHub Issue Templates",
  },
  produce({ options }) {
    return {
      files: {
        ".github": {
          ISSUE_TEMPLATE: {
            "01-bug.yaml": formatYaml({
              name: "🐛 Bug",
              description: "Report a bug trying to run the code",
              title: "🐛 Bug: <short description of the bug>",
              labels: ["type: bug"],
              body: [
                {
                  type: "checkboxes",
                  attributes: {
                    description:
                      "If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
                    label: "Bug Report Checklist",
                    options: [
                      {
                        label:
                          "I have tried restarting my IDE and the issue persists.",
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
                  type: "textarea",
                  attributes: {
                    description: "What did you expect to happen?",
                    label: "Expected",
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: "textarea",
                  attributes: {
                    description: "What happened instead?",
                    label: "Actual",
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: "input",
                  attributes: {
                    description: "Version of this package you tried",
                    label: "Version",
                    placeholder: "1.2.3",
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: "textarea",
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: "Additional Info",
                  },
                },
              ],
            }),
            "02-documentation.yaml": formatYaml({
              name: "📝 Documentation",
              description: "Report a typo or missing area of documentation",
              title: "📝 Documentation: <short description of the request>",
              labels: ["area: documentation"],
              body: [
                {
                  type: "checkboxes",
                  attributes: {
                    description:
                      "If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
                    label: "Documentation Report Checklist",
                    options: [
                      {
                        label:
                          "I have checked the latest `main` branch of the repository.",
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
                  type: "textarea",
                  attributes: {
                    description: "What would you like to report?",
                    label: "Overview",
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: "textarea",
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: "Additional Info",
                  },
                },
              ],
            }),
            "03-feature.yaml": formatYaml({
              name: "🚀 Feature",
              description:
                "Request that a new feature be added or an existing feature improved",
              title: "🚀 Feature: <short description of the feature>",
              labels: ["type: feature"],
              body: [
                {
                  type: "checkboxes",
                  attributes: {
                    description:
                      "If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
                    label: "Feature Request Checklist",
                    options: [
                      {
                        label: `I have [searched for related issues](https://github.com/${options.owner}/${options.repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
                        required: true,
                      },
                    ],
                  },
                },
                {
                  type: "textarea",
                  attributes: {
                    description: "What would you like to be able to do?",
                    label: "Overview",
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: "textarea",
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: "Additional Info",
                  },
                },
              ],
            }),
            "04-tooling.yaml": formatYaml({
              name: "🛠 Tooling",
              description:
                "Report a bug or request an enhancement in repository tooling",
              title: "🛠 Tooling: <short description of the change>",
              labels: ["area: tooling"],
              body: [
                {
                  type: "checkboxes",
                  attributes: {
                    description:
                      "If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
                    label: "Tooling Report Checklist",
                    options: [
                      {
                        label:
                          "I have tried restarting my IDE and the issue persists.",
                        required: true,
                      },
                      {
                        label:
                          "I have pulled the latest `main` branch of the repository.",
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
                  type: "textarea",
                  attributes: {
                    description: "What tooling changes would you like to make?",
                    label: "Overview",
                  },
                  validations: {
                    required: true,
                  },
                },
                {
                  type: "textarea",
                  attributes: {
                    description: "Any additional info you'd like to provide.",
                    label: "Additional Info",
                  },
                },
              ],
            }),
          },
          "ISSUE_TEMPLATE.md": `<!-- Note: Please must use one of our issue templates to file an issue! 🛑 -->
<!-- 👉 https://github.com/${options.owner}/${options.repository}/issues/new/choose 👈 -->
<!-- **Issues that should have been filed with a template will be closed without action, and we will ask you to use a template.** -->

<!-- This blank issue template is only for issues that don't fit any of the templates. -->

## Overview

...
`,
        },
      },
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveFiles({
          files: [
            ".github/ISSUE_TEMPLATE/01-bug.yml",
            ".github/ISSUE_TEMPLATE/02-documentation.yml",
            ".github/ISSUE_TEMPLATE/03-feature.yml",
            ".github/ISSUE_TEMPLATE/04-tooling.yml",
          ],
        }),
      ],
    };
  },
});
