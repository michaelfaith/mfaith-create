import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRepositoryVariables } from "./blockRepositoryVariables.js";
import { optionsBase } from "./options.fakes.js";

describe(blockRepositoryVariables, () => {
  test("without addons", () => {
    const creation = testBlock(blockRepositoryVariables, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": undefined,
			}
		`);
  });

  test("with addons", () => {
    const creation = testBlock(blockRepositoryVariables, {
      addons: {
        variables: [
          {
            description: "Variable description a.",
            name: "Variable Name A",
          },
          {
            description: "Variable description b.",
            name: "Variable Name B",
          },
        ],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": [
			    "- populate the variables on https://github.com/test-owner/test-repository/settings/variables/actions:
			   - Variable Name A (Variable description a.)
			   - Variable Name B (Variable description b.)",
			  ],
			}
		`);
  });
});
