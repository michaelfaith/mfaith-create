import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockSecurityDocs } from './blockSecurityDocs.ts';
import { optionsBase } from './options.fakes.ts';

describe('blockSecurityDocs', () => {
  test('production (with contact.bluesky)', () => {
    const creation = testBlock(blockSecurityDocs, {
      options: { ...optionsBase, contact: { bluesky: 'social.media' } },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "SECURITY.md": "# Security Policy

      We take all security vulnerabilities seriously.
      If you have a vulnerability or other security issues to disclose:

      - Thank you very much, please do!
      - Please send them to us on [Bluesky](https://bsky.app/profile/social.media).

      We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.
      ",
          },
        },
      }
    `);
  });

  test('production (with contact.url)', () => {
    const creation = testBlock(blockSecurityDocs, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "SECURITY.md": "# Security Policy

      We take all security vulnerabilities seriously.
      If you have a vulnerability or other security issues to disclose:

      - Thank you very much, please do!
      - Please send them to us at http://contact.url.

      We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.
      ",
          },
        },
      }
    `);
  });

  test('production (with no contact.bluesky or contact.url)', () => {
    const creation = testBlock(blockSecurityDocs, {
      options: { ...optionsBase, contact: { email: 'test@email.com' } },
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "files": {
          ".github": {
            "SECURITY.md": "# Security Policy

      We take all security vulnerabilities seriously.
      If you have a vulnerability or other security issues to disclose:

      - Thank you very much, please do!
      - Please send them to us at test@email.com.

      We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.
      ",
          },
        },
      }
    `);
  });
});
