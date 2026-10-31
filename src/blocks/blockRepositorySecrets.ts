import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { getInstallationSuggestions } from './getInstallationSuggestions.ts';

const secretSchema: z.ZodType<Secret> = z.object({
  description: z.string(),
  name: z.string(),
});
export interface Secret {
  description: string;
  name: string;
}

export interface BlockRepositorySecretsProps {
  secrets?: Secret[];
}

export const blockRepositorySecrets: BlockWithProps<BlockRepositorySecretsProps> = base.createBlock(
  {
    about: {
      name: 'Repository Secrets',
    },
    props: {
      secrets: z.array(secretSchema).default([]),
    },
    produce({ options, props }) {
      return {
        suggestions: getInstallationSuggestions(
          'populate the secret',
          props.secrets.map((secret) => `${secret.name} (${secret.description})`),
          `https://github.com/${options.owner}/${options.repository}/settings/secrets/actions`,
        ),
      };
    },
  },
);
