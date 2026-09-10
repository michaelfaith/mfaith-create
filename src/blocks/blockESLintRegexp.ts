import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { JS_TS_FILES } from "./eslint/globs.js";

export const blockESLintRegexp = base.createBlock({
  about: {
    name: "ESLint Regexp Plugin",
  },
  produce() {
    return {
      addons: [
        blockESLint({
          extensions: [
            {
              extends: [`regexp.configs["flat/recommended"]`],
              files: JS_TS_FILES,
            },
          ],
          imports: [
            { source: "eslint-plugin-regexp", specifier: "* as regexp" },
          ],
        }),
      ],
    };
  },
});
