import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockBin } from "./blockBin.js";
import { optionsBase } from "./options.fakes.js";

describe(blockBin, () => {
  it("without addons", () => {
    const creation = testBlock(blockBin, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.{js,ts}",
                  ],
                  "rules": [
                    {
                      "comment": "Using a ts bin file throws this rule off.",
                      "entries": {
                        "n/hashbang": "off",
                      },
                    },
                  ],
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "bin": "dist/bin/index.js",
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": {
                "bin": {
                  "index.ts": "#!/usr/bin/env node
      import { greet } from "../index.ts";

      greet("Hello, world! ✨");",
                },
              },
            },
            "block": [Function],
          },
        ],
      }
    `);
  });

  it("with string src", () => {
    const creation = testBlock(blockBin, {
      addons: {
        src: "dist/cli.ts",
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.{js,ts}",
                  ],
                  "rules": [
                    {
                      "comment": "Using a ts bin file throws this rule off.",
                      "entries": {
                        "n/hashbang": "off",
                      },
                    },
                  ],
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "bin": "dist/cli.js",
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": {
                "bin": {
                  "index.ts": "#!/usr/bin/env node
      import { greet } from "../index.ts";

      greet("Hello, world! ✨");",
                },
              },
            },
            "block": [Function],
          },
        ],
      }
    `);
  });

  it("with object src", () => {
    const creation = testBlock(blockBin, {
      addons: {
        src: {
          "test-repo": "dist/bin/index.mts",
          "other-bin": "dist/bin/other.cts",
        },
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "extensions": [
                {
                  "files": [
                    "**/*.{js,ts}",
                  ],
                  "rules": [
                    {
                      "comment": "Using a ts bin file throws this rule off.",
                      "entries": {
                        "n/hashbang": "off",
                      },
                    },
                  ],
                },
              ],
            },
            "block": [Function],
          },
          {
            "addons": {
              "properties": {
                "bin": {
                  "other-bin": "dist/bin/other.cjs",
                  "test-repo": "dist/bin/index.mjs",
                },
              },
            },
            "block": [Function],
          },
          {
            "addons": {
              "files": {
                "bin": {
                  "index.ts": "#!/usr/bin/env node
      import { greet } from "../index.ts";

      greet("Hello, world! ✨");",
                },
              },
            },
            "block": [Function],
          },
        ],
      }
    `);
  });
});
