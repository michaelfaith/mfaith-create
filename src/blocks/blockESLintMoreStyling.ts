import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { JS_TS_FILES } from "./eslint/globs.js";

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
