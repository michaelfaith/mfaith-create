import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockBin } from "./blockBin.ts";
import { optionsBase } from "./options.fakes.ts";

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
                    "**/*.js",
                    "**/*.ts",
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
                "bin": "dist/bin/index.mjs",
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
                    "**/*.js",
                    "**/*.ts",
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
                "bin": "dist/cli.mjs",
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
          "other-bin": "dist/bin/other.ts",
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
                    "**/*.js",
                    "**/*.ts",
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
                  "other-bin": "dist/bin/other.mjs",
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

  describe("intake", () => {
    it("returns undefined when package.json does not exist", () => {
      const actual = testIntake(blockBin, {
        files: {},
      });

      expect(actual).toBeUndefined();
    });

    it("returns undefined when package.json does not contain a bin", () => {
      const actual = testIntake(blockBin, {
        files: {
          "package.json": [JSON.stringify({ name: "some-repo" })],
        },
      });

      expect(actual).toBeUndefined();
    });

    it("returns bin when package.json contains a string bin", () => {
      const packageJson = { bin: "dist/cli.js" };

      const actual = testIntake(blockBin, {
        files: {
          "package.json": [JSON.stringify(packageJson)],
        },
      });

      expect(actual).toEqual({ src: "src/cli.ts" });
    });

    it("returns bin when package.json contains a string bin with `mjs` extension", () => {
      const packageJson = { bin: "dist/cli.mjs" };

      const actual = testIntake(blockBin, {
        files: {
          "package.json": [JSON.stringify(packageJson)],
        },
      });

      expect(actual).toEqual({ src: "src/cli.ts" });
    });

    it("returns bin when package.json contains an object bin", () => {
      const packageJson = {
        bin: {
          "test-repo": "dist/cli.mjs",
          "other-bin": "dist/other.cjs",
        },
      };

      const actual = testIntake(blockBin, {
        files: {
          "package.json": [JSON.stringify(packageJson)],
        },
      });

      expect(actual).toEqual({
        src: {
          "test-repo": "src/cli.ts",
          "other-bin": "src/other.ts",
        },
      });
    });
  });
});
