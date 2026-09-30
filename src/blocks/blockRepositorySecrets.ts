import type { BlockWithAddons } from 'bingo-stratum';
import { z } from 'zod';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
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

export const blockRepositorySecrets: BlockWithAddons<
  BlockRepositorySecretsProps,
  Options
> = base.createBlock({
  about: {
    name: 'Repository Secrets',
  },
  addons: {
    secrets: z.array(secretSchema).default([]),
  },
  produce({ addons, options }) {
    return {
      suggestions: getInstallationSuggestions(
        'populate the secret',
        addons.secrets.map(
          (secret) => `${secret.name} (${secret.description})`,
        ),
        `https://github.com/${options.owner}/${options.repository}/settings/secrets/actions`,
      ),
    };
  },
});
