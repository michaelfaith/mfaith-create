import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { getInstallationSuggestions } from './getInstallationSuggestions.ts';

const appInfoSchema: z.ZodType<AppInfo> = z.object({
  name: z.string(),
  url: z.string(),
});
export interface AppInfo {
  name: string;
  url: string;
}

export interface BlockGithubAppsProps {
  apps?: AppInfo[];
}

export const blockGithubApps: BlockWithProps<BlockGithubAppsProps> = base.createBlock({
  about: {
    name: 'GitHub Apps',
  },
  addons: {
    apps: z.array(appInfoSchema).default([]),
  },
  produce({ addons, options }) {
    return {
      suggestions: getInstallationSuggestions(
        'enable the GitHub app',
        addons.apps.map((app) => `${app.name} (${app.url})`),
        `https://github.com/${options.owner}/${options.repository}/settings/installations`,
      ),
    };
  },
});
