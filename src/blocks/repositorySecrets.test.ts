import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { optionsBase } from './options.fakes.ts';
import { repositorySecrets } from './repositorySecrets.ts';

describe(repositorySecrets, () => {
  test('without props', () => {
    const creation = testBlock(repositorySecrets, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": undefined,
			}
		`);
  });

  test('with props', () => {
    const creation = testBlock(repositorySecrets, {
      props: {
        secrets: [
          {
            description: 'Secret description a.',
            name: 'Secret Name A',
          },
          {
            description: 'Secret description b.',
            name: 'Secret Name B',
          },
        ],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": [
			    "- populate the secrets on https://github.com/test-owner/test-repository/settings/secrets/actions:
			   - Secret Name A (Secret description a.)
			   - Secret Name B (Secret description b.)",
			  ],
			}
		`);
  });
});
