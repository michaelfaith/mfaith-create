import { z } from "zod";

import { base } from "../base.js";
import { resolveUses } from "./actions/resolveUses.js";
import { blockCSpell } from "./blockCSpell.js";
import { blockPrettier } from "./blockPrettier.js";
import { blockREADME } from "./blockREADME.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRepositorySecrets } from "./blockRepositorySecrets.js";
import { blockRepositoryVariables } from "./blockRepositoryVariables.js";
import { createMultiWorkflowFile } from "./files/createMultiWorkflowFile.js";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.js";

const isScopedPackage = (packageName: string | undefined): boolean =>
  !!packageName?.startsWith("@");

export const blockReleasePlease = base.createBlock({
  about: {
    name: "Release Please",
  },
  addons: {
    builders: z
      .array(
        z.object({
          order: z.number(),
          run: z.string(),
        }),
      )
      .default([]),
    currentVersion: z.string().optional(),
  },
  intake({ files }) {
    const releasePleaseManifest = intakeFileAsJson(files, [
      ".github",
      "release-please",
      "release-please-manifest.main.json",
    ]);
    const { data: manifestVersion } = z
      .string()
      .safeParse(releasePleaseManifest?.["."]);
    if (manifestVersion) {
      return {
        currentVersion: manifestVersion,
      };
    }

    return undefined;
  },
  produce({ addons, options }) {
    const { builders, currentVersion } = addons;

    return {
      addons: [
        blockCSpell({ words: ["RELEASEBOT"] }),
        blockPrettier({ ignores: ["/CHANGELOG.md"] }),
        blockREADME({
          badges: [
            {
              alt: "📦 npm version",
              href: `http://npmjs.com/package/${options.packageName}`,
              src: `https://img.shields.io/npm/v/${options.packageName}?color=21bb42&label=%F0%9F%93%A6%20npm`,
            },
          ],
        }),
        blockRepositorySecrets({
          secrets: [
            {
              description:
                "an app Private Key for generating an ephemeral token",
              name: "RELEASEBOT_APP_PRIVATE_KEY",
            },
          ],
        }),
        blockRepositoryVariables({
          variables: [
            {
              description:
                "the client id for an app that generates an ephemeral token",
              name: "RELEASEBOT_APP_CLIENT_ID",
            },
          ],
        }),
      ],
      files: {
        ".github": {
          workflows: {
            "release.yaml": createMultiWorkflowFile({
              name: "Release",
              on: {
                push: {
                  branches: ["main"],
                },
              },
              concurrency: {
                group: "${{ github.workflow }}",
              },
              jobs: [
                {
                  id: "release_please",
                  name: "Manage Release PR",
                  if: "github.event.repository.fork != true",
                  outputs: {
                    releases_created:
                      "${{ steps.release.outputs.releases_created }}",
                    tag_name: "${{ steps.release.outputs.tag_name }}",
                  },
                  steps: [
                    {
                      name: "Create Token",
                      id: "create_token",
                      uses: resolveUses(
                        "actions/create-github-app-token",
                        "v3.2.0",
                        options.workflowsVersions,
                      ),
                      with: {
                        "client-id": "${{ vars.RELEASEBOT_APP_CLIENT_ID }}",
                        "private-key":
                          "${{ secrets.RELEASEBOT_APP_PRIVATE_KEY }}",
                      },
                    },
                    {
                      name: "Release Please",
                      id: "release",
                      uses: resolveUses(
                        "googleapis/release-please-action",
                        "v5.0.0",
                        options.workflowsVersions,
                      ),
                      with: {
                        "config-file":
                          ".github/release-please/release-please-config.${{ github.ref_name }}.json",
                        "manifest-file":
                          ".github/release-please/release-please-manifest.${{ github.ref_name }}.json",
                        "target-branch": "${{ github.ref_name }}",
                        token: "${{ steps.create_token.outputs.token }}",
                      },
                    },
                  ],
                },
                {
                  id: "publish",
                  name: "Publish Package",
                  if: "${{ needs.release_please.outputs.releases_created == 'true' }}",
                  needs: "release_please",
                  permissions: {
                    contents: "read",
                    "id-token": "write",
                  },
                  outputs: {
                    dist_tag:
                      "${{ steps.determine_dist_tag.outputs.dist_tag }}",
                  },
                  steps: [
                    { uses: "$/.github/actions/setup" },
                    {
                      name: "Determine dist-tag",
                      id: "determine_dist_tag",
                      run: `TAG_NAME="\${{ needs.release_please.outputs.tag_name }}"
echo "Release tag: $TAG_NAME"

if [[ "$TAG_NAME" == *"-alpha."* ]]; then
  DIST_TAG=alpha
elif [[ "$TAG_NAME" == *"-beta."* ]]; then
  DIST_TAG=beta
elif [[ "$TAG_NAME" == *"-rc."* ]]; then
  DIST_TAG=rc
elif [[ "$TAG_NAME" == *"-"* ]]; then
  DIST_TAG=next
else
  DIST_TAG=latest
fi

echo "dist_tag=$DIST_TAG" >> "$GITHUB_OUTPUT"`,
                    },
                    ...builders
                      .sort((a, b) => a.order - b.order)
                      .map(({ run }) => ({ name: "Build", run })),
                    {
                      name: "Publish",
                      run: `echo "Publishing to npm with dist-tag '\${{ steps.determine_dist_tag.outputs.dist_tag }}'"
pnpm publish --publish-branch \${{ github.ref_name }} --tag \${{ steps.determine_dist_tag.outputs.dist_tag }}${isScopedPackage(options.packageName) ? " --access public" : ""}`,
                    },
                  ],
                },
                {
                  id: "post_release",
                  name: "Post Release Comments",
                  needs: "publish",
                  permissions: {
                    issues: "write",
                    "pull-requests": "write",
                  },
                  steps: [
                    {
                      uses: resolveUses(
                        "actions/checkout",
                        "v7",
                        options.workflowsVersions,
                      ),
                      with: {
                        "fetch-depth": 0,
                      },
                    },
                    {
                      run: `echo "npm_version=$(npm pkg get version | tr -d '"')" >> "$GITHUB_ENV"`,
                    },
                    {
                      uses: resolveUses(
                        "apexskier/github-release-commenter",
                        "v1",
                        options.workflowsVersions,
                      ),
                      with: {
                        GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
                        "comment-template": `:tada: This is included in version {release_link} :tada:

The release is available on:

* [GitHub releases](https://github.com/michaelfaith/mfaith-create/releases/tag/{release_tag})
* [npm package (@\${{ needs.publish.outputs.dist_tag }} dist-tag)](https://www.npmjs.com/package/@mfaith/create/v/\${{ env.npm_version }})

Cheers! 📦🚀`,
                      },
                    },
                  ],
                },
              ],
            }),
          },
          "release-please": {
            "release-please-config.main.json": JSON.stringify({
              "bump-minor-pre-major": true,
              "bump-patch-for-minor-pre-major": true,
              "changelog-sections": [
                { type: "feat", section: "🚀 Features", hidden: false },
                { type: "fix", section: "🩹 Bug Fixes", hidden: false },
                {
                  type: "perf",
                  section: "🏁 Performance Improvements",
                  hidden: false,
                },
                { type: "build", hidden: true },
                { type: "chore", hidden: true },
                { type: "ci", hidden: true },
                { type: "docs", hidden: true },
                { type: "refactor", hidden: true },
                { type: "test", hidden: true },
              ],
              "include-component-in-tag": false,
              "initial-version": "0.1.0",
              "release-type": "node",
              packages: {
                ".": {},
              },
            }),
            "release-please-manifest.main.json": JSON.stringify({
              ".": currentVersion ?? options.version,
            }),
          },
        },
      },
      suggestions: [
        [
          `- add ${options.owner}/${options.repository} and \`release.yaml\` as a Trusted Publisher on:`,
          `   https://www.npmjs.com/package/${options.packageName}/access`,
        ].join("\n"),
      ],
    };
  },
  transition() {
    return {
      addons: [
        blockRemoveFiles({
          files: [
            ".github/workflows/post-release.yml",
            ".github/workflows/release.yml",
          ],
        }),
      ],
    };
  },
});
