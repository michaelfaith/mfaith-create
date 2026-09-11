import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { JS_TS_FILES } from "./eslint/globs.ts";

export const stylisticComment =
  "Stylistic concerns that don't interfere with Prettier";

export const blockESLintMoreStyling = base.createBlock({
  about: {
    name: "ESLint More Styling",
  },
  produce() {
    return {
      addons: [
        blockESLint({
          extensions: [
            {
              files: JS_TS_FILES,
              rules: [
                {
                  comment: stylisticComment,
                  entries: {
                    "logical-assignment-operators": [
                      "error",
                      "always",
                      { enforceForIfStatements: true },
                    ],
                    "no-useless-rename": "error",
                    "object-shorthand": "error",
                    "operator-assignment": "error",
                  },
                },
              ],
            },
          ],
        }),
      ],
    };
  },
});
