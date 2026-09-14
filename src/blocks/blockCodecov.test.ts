import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockCodecov } from './blockCodecov.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockCodecov', () => {
  test('without addons or mode', () => {
    const creation = testBlock(blockCodecov, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "apps": [
                {
                  "name": "Codecov",
                  "url": "https://github.com/apps/codecov",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "badges": [
                {
                  "alt": "🧪 Coverage",
                  "href": "https://codecov.io/gh/test-owner/test-repository",
                  "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "actionSteps": [
                {
                  "if": "success() && (matrix.os == 'ubuntu-latest')",
                  "uses": "codecov/codecov-action@v7",
                  "with": {
                    "fail_ci_if_error": true,
                    "use_oidc": true,
                  },
                },
              ],
              "permissions": {
                "id-token": "write",
              },
            },
            "block": [Function],
          },
        ],
      }
    `);
  });

  test('transition mode without files', () => {
    const creation = testBlock(blockCodecov, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "apps": [
                {
                  "name": "Codecov",
                  "url": "https://github.com/apps/codecov",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "badges": [
                {
                  "alt": "🧪 Coverage",
                  "href": "https://codecov.io/gh/test-owner/test-repository",
                  "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "actionSteps": [
                {
                  "if": "success() && (matrix.os == 'ubuntu-latest')",
                  "uses": "codecov/codecov-action@v7",
                  "with": {
                    "fail_ci_if_error": true,
                    "use_oidc": true,
                  },
                },
              ],
              "permissions": {
                "id-token": "write",
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": [
                ".github/codecov.{yaml,yml}",
                "codecov.{yaml,yml}",
              ],
            },
            "block": [Function],
          },
        ],
      }
    `);
  });
});
