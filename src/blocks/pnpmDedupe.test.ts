import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { pnpmDedupe } from './pnpmDedupe.ts';

describe(pnpmDedupe, () => {
  test('without mode', () => {
    const creation = testBlock(pnpmDedupe, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
              "jobs": [
                {
                  "name": "Dedupe Check",
                  "steps": [
                    {
                      "run": "pnpm dedupe --check",
                    },
                  ],
                },
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "cleanupCommands": [
                "pnpm dedupe --prefer-offline",
              ],
            },
          },
        ],
      }
    `);
  });

  test('transition mode', () => {
    const creation = testBlock(pnpmDedupe, {
      mode: 'transition',
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "extensions": [
          {
            "block": "[Block GitHub Actions CI]",
            "props": {
              "jobs": [
                {
                  "name": "Dedupe Check",
                  "steps": [
                    {
                      "run": "pnpm dedupe --check",
                    },
                  ],
                },
              ],
            },
          },
          {
            "block": "[Block Package JSON]",
            "props": {
              "cleanupCommands": [
                "pnpm dedupe --prefer-offline",
              ],
            },
          },
          {
            "block": "[Block Remove Workflows]",
            "props": {
              "workflows": [
                "lint-packages",
              ],
            },
          },
        ],
      }
    `);
  });
});
