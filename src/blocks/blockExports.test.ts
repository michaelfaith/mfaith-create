import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { blockExports } from './blockExports.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockExports, () => {
  it('without addons', () => {
    const creation = testBlock(blockExports, { options: optionsBase });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./dist/index.mjs",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node ./dist/index.mjs",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
  });

  it('with addons', () => {
    const creation = testBlock(blockExports, {
      addons: {
        filePath: 'other.js',
        runArgs: ['--version'],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./other.js",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node other.js --version",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
  });
});
