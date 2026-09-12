import { testBlock, testIntake } from 'bingo-stratum-testers';
import { describe, expect, it, test } from 'vitest';

import { blockReleasePlease } from './blockReleasePlease.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockReleasePlease, () => {
  test('without addons', () => {
    const creation = testBlock(blockReleasePlease, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "words": [
                "RELEASEBOT",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/CHANGELOG.md",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "badges": [
                {
                  "alt": "📦 npm version",
                  "href": "http://npmjs.com/package/test-package-name",
                  "src": "https://img.shields.io/npm/v/test-package-name?color=21bb42&label=%F0%9F%93%A6%20npm",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "secrets": [
                {
                  "description": "an app Private Key for generating an ephemeral token",
                  "name": "RELEASEBOT_APP_PRIVATE_KEY",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "variables": [
                {
                  "description": "the client id for an app that generates an ephemeral token",
                  "name": "RELEASEBOT_APP_CLIENT_ID",
                },
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          ".github": {
            "release-please": {
              "release-please-config.main.json": "{"bump-minor-pre-major":true,"bump-patch-for-minor-pre-major":true,"changelog-sections":[{"type":"feat","section":"🚀 Features","hidden":false},{"type":"fix","section":"🩹 Bug Fixes","hidden":false},{"type":"perf","section":"🏁 Performance Improvements","hidden":false},{"type":"build","hidden":true},{"type":"chore","hidden":true},{"type":"ci","hidden":true},{"type":"docs","hidden":true},{"type":"refactor","hidden":true},{"type":"test","hidden":true}],"include-component-in-tag":false,"initial-version":"0.1.0","release-type":"node","packages":{".":{}}}",
              "release-please-manifest.main.json": "{
        ".": "0.0.0"
      }",
            },
            "workflows": {
              "release.yaml": "name: Release

      on:
        push:
          branches:
            - main

      concurrency:
        group: \${{ github.workflow }}

      jobs:
        release_please:
          name: Manage Release PR
          if: github.event.repository.fork != true
          runs-on: ubuntu-latest
          outputs:
            releases_created: \${{ steps.release.outputs.releases_created }}
            tag_name: \${{ steps.release.outputs.tag_name }}
          steps:
            - name: Create Token
              id: create_token
              uses: actions/create-github-app-token@v3.2.0
              with:
                client-id: \${{ vars.RELEASEBOT_APP_CLIENT_ID }}
                private-key: \${{ secrets.RELEASEBOT_APP_PRIVATE_KEY }}
            - name: Release Please
              id: release
              uses: googleapis/release-please-action@v5.0.0
              with:
                config-file: .github/release-please/release-please-config.\${{ github.ref_name }}.json
                manifest-file: .github/release-please/release-please-manifest.\${{ github.ref_name }}.json
                target-branch: \${{ github.ref_name }}
                token: \${{ steps.create_token.outputs.token }}

        publish:
          name: Publish Package
          if: \${{ needs.release_please.outputs.releases_created == 'true' }}
          needs: release_please
          runs-on: ubuntu-latest
          permissions:
            contents: read
            id-token: write
          outputs:
            dist_tag: \${{ steps.determine_dist_tag.outputs.dist_tag }}
          steps:
            - uses: $/.github/actions/setup
            - name: Determine dist-tag
              id: determine_dist_tag
              run: |-
                TAG_NAME="\${{ needs.release_please.outputs.tag_name }}"
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

                echo "dist_tag=$DIST_TAG" >> "$GITHUB_OUTPUT"
            - name: Publish
              run: |-
                echo "Publishing to npm with dist-tag '\${{ steps.determine_dist_tag.outputs.dist_tag }}'"
                pnpm publish --publish-branch \${{ github.ref_name }} --tag \${{ steps.determine_dist_tag.outputs.dist_tag }}

        post_release:
          name: Post Release Comments
          needs: publish
          runs-on: ubuntu-latest
          permissions:
            issues: write
            pull-requests: write
          steps:
            - uses: actions/checkout@v7
              with:
                fetch-depth: 0
            - run: echo "npm_version=$(npm pkg get version | tr -d '"')" >> "$GITHUB_ENV"
            - uses: apexskier/github-release-commenter@v1
              with:
                GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
                comment-template: |-
                  :tada: This is included in version {release_link} :tada:

                  The release is available on:

                  * [GitHub releases](https://github.com/michaelfaith/mfaith-create/releases/tag/{release_tag})
                  * [npm package (@\${{ needs.publish.outputs.dist_tag }} dist-tag)](https://www.npmjs.com/package/@mfaith/create/v/\${{ env.npm_version }})

                  Cheers! 📦🚀
      ",
            },
          },
        },
        "suggestions": [
          "- add test-owner/test-repository and \`release.yaml\` as a Trusted Publisher on:
         https://www.npmjs.com/package/test-package-name/access",
        ],
      }
    `);
  });

  test('with addons', () => {
    const creation = testBlock(blockReleasePlease, {
      addons: {
        builders: [
          {
            order: 1,
            run: 'one',
          },
          {
            order: 0,
            run: 'zero',
          },
          {
            order: 2,
            run: 'two',
          },
        ],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "words": [
                "RELEASEBOT",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "ignores": [
                "/CHANGELOG.md",
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "badges": [
                {
                  "alt": "📦 npm version",
                  "href": "http://npmjs.com/package/test-package-name",
                  "src": "https://img.shields.io/npm/v/test-package-name?color=21bb42&label=%F0%9F%93%A6%20npm",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "secrets": [
                {
                  "description": "an app Private Key for generating an ephemeral token",
                  "name": "RELEASEBOT_APP_PRIVATE_KEY",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "variables": [
                {
                  "description": "the client id for an app that generates an ephemeral token",
                  "name": "RELEASEBOT_APP_CLIENT_ID",
                },
              ],
            },
            "block": [Function],
          },
        ],
        "files": {
          ".github": {
            "release-please": {
              "release-please-config.main.json": "{"bump-minor-pre-major":true,"bump-patch-for-minor-pre-major":true,"changelog-sections":[{"type":"feat","section":"🚀 Features","hidden":false},{"type":"fix","section":"🩹 Bug Fixes","hidden":false},{"type":"perf","section":"🏁 Performance Improvements","hidden":false},{"type":"build","hidden":true},{"type":"chore","hidden":true},{"type":"ci","hidden":true},{"type":"docs","hidden":true},{"type":"refactor","hidden":true},{"type":"test","hidden":true}],"include-component-in-tag":false,"initial-version":"0.1.0","release-type":"node","packages":{".":{}}}",
              "release-please-manifest.main.json": "{
        ".": "0.0.0"
      }",
            },
            "workflows": {
              "release.yaml": "name: Release

      on:
        push:
          branches:
            - main

      concurrency:
        group: \${{ github.workflow }}

      jobs:
        release_please:
          name: Manage Release PR
          if: github.event.repository.fork != true
          runs-on: ubuntu-latest
          outputs:
            releases_created: \${{ steps.release.outputs.releases_created }}
            tag_name: \${{ steps.release.outputs.tag_name }}
          steps:
            - name: Create Token
              id: create_token
              uses: actions/create-github-app-token@v3.2.0
              with:
                client-id: \${{ vars.RELEASEBOT_APP_CLIENT_ID }}
                private-key: \${{ secrets.RELEASEBOT_APP_PRIVATE_KEY }}
            - name: Release Please
              id: release
              uses: googleapis/release-please-action@v5.0.0
              with:
                config-file: .github/release-please/release-please-config.\${{ github.ref_name }}.json
                manifest-file: .github/release-please/release-please-manifest.\${{ github.ref_name }}.json
                target-branch: \${{ github.ref_name }}
                token: \${{ steps.create_token.outputs.token }}

        publish:
          name: Publish Package
          if: \${{ needs.release_please.outputs.releases_created == 'true' }}
          needs: release_please
          runs-on: ubuntu-latest
          permissions:
            contents: read
            id-token: write
          outputs:
            dist_tag: \${{ steps.determine_dist_tag.outputs.dist_tag }}
          steps:
            - uses: $/.github/actions/setup
            - name: Determine dist-tag
              id: determine_dist_tag
              run: |-
                TAG_NAME="\${{ needs.release_please.outputs.tag_name }}"
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

                echo "dist_tag=$DIST_TAG" >> "$GITHUB_OUTPUT"
            - name: Build
              run: zero
            - name: Build
              run: one
            - name: Build
              run: two
            - name: Publish
              run: |-
                echo "Publishing to npm with dist-tag '\${{ steps.determine_dist_tag.outputs.dist_tag }}'"
                pnpm publish --publish-branch \${{ github.ref_name }} --tag \${{ steps.determine_dist_tag.outputs.dist_tag }}

        post_release:
          name: Post Release Comments
          needs: publish
          runs-on: ubuntu-latest
          permissions:
            issues: write
            pull-requests: write
          steps:
            - uses: actions/checkout@v7
              with:
                fetch-depth: 0
            - run: echo "npm_version=$(npm pkg get version | tr -d '"')" >> "$GITHUB_ENV"
            - uses: apexskier/github-release-commenter@v1
              with:
                GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
                comment-template: |-
                  :tada: This is included in version {release_link} :tada:

                  The release is available on:

                  * [GitHub releases](https://github.com/michaelfaith/mfaith-create/releases/tag/{release_tag})
                  * [npm package (@\${{ needs.publish.outputs.dist_tag }} dist-tag)](https://www.npmjs.com/package/@mfaith/create/v/\${{ env.npm_version }})

                  Cheers! 📦🚀
      ",
            },
          },
        },
        "suggestions": [
          "- add test-owner/test-repository and \`release.yaml\` as a Trusted Publisher on:
         https://www.npmjs.com/package/test-package-name/access",
        ],
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(blockReleasePlease, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation.addons).toContainEqual(
      blockRemoveFiles({
        files: [
          '.github/workflows/post-release.yml',
          '.github/workflows/release.yml',
        ],
      }),
    );
  });

  describe('intake', () => {
    it('should return undefined when the release please manifest does not exist', () => {
      const actual = testIntake(blockReleasePlease, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it('should return undefined when the manifest exists but does not contain a version', () => {
      const actual = testIntake(blockReleasePlease, {
        files: {
          '.github': {
            'release-please': {
              'release-please-manifest.main.json': [JSON.stringify({})],
            },
          },
        },
      });

      expect(actual).toBeUndefined();
    });

    it('should return a version when the manifest exists and has a version', () => {
      const actual = testIntake(blockReleasePlease, {
        files: {
          '.github': {
            'release-please': {
              'release-please-manifest.main.json': [
                JSON.stringify({ '.': '13.0.0' }),
              ],
            },
          },
        },
      });

      expect(actual).toEqual({ currentVersion: '13.0.0' });
    });
  });
});
