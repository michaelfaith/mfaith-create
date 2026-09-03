import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockPrettier } from "./blockPrettier.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../data/packageData.js", () => ({
	getPackageDependencies: (...names: string[]) =>
		Object.fromEntries(names.map((name) => [name, "1.2.3"])),
}));

describe(blockPrettier, () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockPrettier, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Formatting": {
			            "contents": "
			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format --write
			\`\`\`
			",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Format Check",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
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
			          "devDependencies": {
			            "husky": "1.2.3",
			            "lint-staged": "1.2.3",
			            "prettier": "1.2.3",
			          },
			          "lint-staged": {
			            "*": "prettier --ignore-unknown --write",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx lint-staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/lib
			/pnpm-lock.yaml
			",
			    "prettier.config.ts": "import type { Config } from "prettier";

			export default {"useTabs":true} satisfies Config;
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm format --write",
			      ],
			      "phase": 4,
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockPrettier, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Formatting": {
			            "contents": "
			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format --write
			\`\`\`
			",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Format Check",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
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
			          "devDependencies": {
			            "husky": "1.2.3",
			            "lint-staged": "1.2.3",
			            "prettier": "1.2.3",
			          },
			          "lint-staged": {
			            "*": "prettier --ignore-unknown --write",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "dependencies": [
			          "eslint-config-prettier",
			          "eslint-plugin-prettier",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": [
			          ".prettierrc",
			          ".prettierrc.{c*,js,m*,t*}",
			          "prettier.config*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "format",
			          "prettier",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx lint-staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/lib
			/pnpm-lock.yaml
			",
			    "prettier.config.ts": "import type { Config } from "prettier";

			export default {"useTabs":true} satisfies Config;
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm format --write",
			      ],
			      "phase": 4,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockPrettier, {
			addons: {
				ignores: ["generated"],
				overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				plugins: [
					"./lib/index.js",
					"prettier-plugin-curly",
					"prettier-plugin-packagejson",
					"prettier-plugin-sh",
				],
				runBefore: ["pnpm build || exit 0"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Formatting": {
			            "contents": "
			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format --write
			\`\`\`
			",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Format Check",
			            "steps": [
			              {
			                "run": "pnpm build || exit 0",
			              },
			              {
			                "run": "pnpm format --list-different",
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
			          "devDependencies": {
			            "husky": "1.2.3",
			            "lint-staged": "1.2.3",
			            "prettier": "1.2.3",
			            "prettier-plugin-curly": "1.2.3",
			            "prettier-plugin-packagejson": "1.2.3",
			            "prettier-plugin-sh": "1.2.3",
			          },
			          "lint-staged": {
			            "*": "prettier --ignore-unknown --write",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx lint-staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/lib
			/pnpm-lock.yaml
			generated
			",
			    "prettier.config.ts": "import type { Config } from "prettier";

			export default {"overrides":[{"files":".nvmrc","options":{"parser":"yaml"}}],"plugins":["./lib/index.js","prettier-plugin-curly","prettier-plugin-packagejson","prettier-plugin-sh"],"useTabs":true} satisfies Config;
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm build || exit 0",
			        "pnpm format --write",
			      ],
			      "phase": 4,
			    },
			  ],
			}
		`);
	});
});
