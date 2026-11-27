import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { githubApps } from './githubApps.ts';
import { intakeFileAsJson } from './intake/intakeFileAsJson.ts';
import { removeFiles } from './removeFiles.ts';

const customManagersSchema = z.array(z.record(z.string(), z.unknown())).default([]);
const ignoreDepsSchema = z.array(z.string()).default([]);
const packageRulesSchema = z.array(z.record(z.string(), z.unknown())).default([]);

const configPathsByPrecedence = [
  ['renovate.json'],
  ['renovate.jsonc'],
  ['renovate.json5'],
  ['.github', 'renovate.json'],
  ['.github', 'renovate.jsonc'],
  ['.github', 'renovate.json5'],
  ['.renovaterc'],
  ['.renovaterc.json'],
  ['.renovaterc.jsonc'],
  ['.renovaterc.json5'],
];

export interface RenovateProps {
  customManagers?: Record<string, unknown>[];
  ignoreDeps?: string[];
  packageRules?: Record<string, unknown>[];
}

export const renovate: BlockWithProps<RenovateProps> = base.createBlock({
  about: {
    name: 'Renovate',
  },
  props: {
    customManagers: customManagersSchema,
    ignoreDeps: ignoreDepsSchema,
    packageRules: packageRulesSchema,
  },
  intake({ files }) {
    const configs = configPathsByPrecedence
      .toReversed()
      .map((filePath) => intakeFileAsJson(files, filePath));

    const collect = <T>(key: string, schema: z.ZodType<T[]>) => {
      const values = configs.flatMap((config) => schema.safeParse(config?.[key]).data ?? []);

      return Array.from(new Map(values.map((value) => [JSON.stringify(value), value])).values());
    };

    return {
      customManagers: collect('customManagers', customManagersSchema),
      ignoreDeps: collect('ignoreDeps', ignoreDepsSchema),
      packageRules: collect('packageRules', packageRulesSchema),
    };
  },
  produce({ props }) {
    const { customManagers, ignoreDeps, packageRules } = props;

    return {
      extensions: [
        githubApps({
          apps: [
            {
              name: 'Renovate',
              url: 'https://github.com/apps/renovate',
            },
          ],
        }),
      ],
      files: {
        '.github': {
          'renovate.json': JSON.stringify({
            $schema: 'https://docs.renovatebot.com/renovate-schema.json',
            automerge: true,
            ...(customManagers.length && { customManagers }),
            extends: [':preserveSemverRanges', 'config:best-practices', 'replacements:all'],
            ignoreDeps: ignoreDeps.length ? Array.from(new Set(ignoreDeps)).sort() : undefined,
            labels: ['dependencies'],
            minimumReleaseAge: '7 days',
            ...(packageRules.length && { packageRules }),
            postUpdateOptions: ['pnpmDedupe'],
          }),
        },
      },
    };
  },
  transition() {
    return {
      extensions: [
        removeFiles({
          files: [
            '.github/renovate.{json5,jsonc}',
            '.renovaterc',
            '.renovaterc.{json,json5,jsonc}',
            'renovate.{json,json5,jsonc}',
          ],
        }),
      ],
    };
  },
});
