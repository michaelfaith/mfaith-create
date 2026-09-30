import type { BlockWithAddons } from 'bingo-stratum';
import { z } from 'zod';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { getInstallationSuggestions } from './getInstallationSuggestions.ts';

const variableSchema: z.ZodType<Variable> = z.object({
  description: z.string(),
  name: z.string(),
});
export interface Variable {
  description: string;
  name: string;
}

export interface BlockRepositoryVariablesProps {
  variables?: Variable[];
}

export const blockRepositoryVariables: BlockWithAddons<
  BlockRepositoryVariablesProps,
  Options
> = base.createBlock({
  about: {
    name: 'Repository Variables',
  },
  addons: {
    variables: z.array(variableSchema).default([]),
  },
  produce({ addons, options }) {
    return {
      suggestions: getInstallationSuggestions(
        'populate the variable',
        addons.variables.map(
          (variable) => `${variable.name} (${variable.description})`,
        ),
        `https://github.com/${options.owner}/${options.repository}/settings/variables/actions`,
      ),
    };
  },
});
