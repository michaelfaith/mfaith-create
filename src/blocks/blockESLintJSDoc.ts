import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { JS_TS_FILES } from "./eslint/globs.js";

export const blockESLintJSDoc = base.createBlock({
  about: {
    name: "ESLint JSDoc Plugin",
  },
  produce() {
    return {
      addons: [
        blockESLint({
          extensions: [
            {
              extends: [
                'jsdoc.configs["flat/contents-typescript-error"]',
                'jsdoc.configs["flat/logical-typescript-error"]',
                'jsdoc.configs["flat/stylistic-typescript-error"]',
              ],
              files: JS_TS_FILES,
            },
          ],
          imports: [{ source: "eslint-plugin-jsdoc", specifier: "jsdoc" }],
        }),
      ],
    };
  },
});
