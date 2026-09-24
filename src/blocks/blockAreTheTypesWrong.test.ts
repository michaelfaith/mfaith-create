import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockAreTheTypesWrong } from './blockAreTheTypesWrong.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockAreTheTypesWrong', () => {
  test('production', () => {
    const creation = testBlock(blockAreTheTypesWrong, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "jobs": [
                {
                  "name": "Are the Types Wrong?",
                  "steps": [
                    {
                      "run": "pnpm build",
                    },
                    {
                      "run": "pnpm pack --out test-repository.tgz",
                    },
                    {
                      "run": "pnpx @arethetypeswrong/cli test-repository.tgz --profile esm-only",
                    },
                  ],
                },
              ],
            },
            "block": "[Block GitHub Actions CI]",
          },
        ],
      }
    `);
  });
});
