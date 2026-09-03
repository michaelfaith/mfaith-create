import { base } from "../base.js";

export const blockSecurityDocs = base.createBlock({
	about: {
		name: "Security Docs",
	},
	produce({ options }) {
		return {
			files: {
				".github": {
					"SECURITY.md": `# Security Policy

We take all security vulnerabilities seriously.
If you have a vulnerability or other security issues to disclose:

- Thank you very much, please do!
- Please send them to us ${formatContact(options.contact)}.

We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.
`,
				},
			},
		};
	},
});

function formatContact(contact: {
	bluesky?: string;
	email?: string;
	url?: string;
}) {
	if (contact.bluesky) {
		return `on [Bluesky](https://bsky.app/profile/${contact.bluesky})`;
	} else {
		return `at ${contact.url || contact.email}`;
	}
}
