import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockCodecov } from './blockCodecov.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockCodecov', () => {
  test('without props or mode', () => {
    const creation = testBlock(blockCodecov, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Apps]",
            "props": {
              "apps": [
                {
                  "name": "Codecov",
                  "url": "https://github.com/apps/codecov",
                },
              ],
            },
          },
          {
            "block": "[Block README.md]",
            "props": {
              "badges": [
                {
                  "alt": "🧪 Coverage",
                  "href": "https://codecov.io/gh/test-owner/test-repository",
                  "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
                },
              ],
            },
          },
          {
            "block": "[Block Vitest]",
            "props": {
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
        "extensions": [
          {
            "block": "[Block GitHub Apps]",
            "props": {
              "apps": [
                {
                  "name": "Codecov",
                  "url": "https://github.com/apps/codecov",
                },
              ],
            },
          },
          {
            "block": "[Block README.md]",
            "props": {
              "badges": [
                {
                  "alt": "🧪 Coverage",
                  "href": "https://codecov.io/gh/test-owner/test-repository",
                  "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
                },
              ],
            },
          },
          {
            "block": "[Block Vitest]",
            "props": {
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
          },
          {
            "block": "[Block Remove Files]",
            "props": {
              "files": [
                ".github/codecov.{yaml,yml}",
                "codecov.{yaml,yml}",
              ],
            },
          },
        ],
      }
    `);
  });
});
