import { z } from 'zod';

export const configEmojiSchema: z.ZodType<ConfigEmoji> = z.array(
  z.tuple([z.string(), z.string()]),
);

type ConfigEmoji = [string, string][];

export const ruleOptionsSchema: z.ZodType<RuleOptions> = z.union([
  z.literal('error'),
  z.literal('off'),
  z.literal('warn'),
  z.tuple([z.union([z.literal('error'), z.literal('warn')]), z.unknown()]),
  z.tuple([
    z.union([z.literal('error'), z.literal('warn')]),
    z.unknown(),
    z.unknown(),
  ]),
]);

export type RuleOptions =
  | 'error'
  | 'off'
  | 'warn'
  | ['error' | 'warn', unknown]
  | ['error' | 'warn', unknown, unknown];

export const extensionRuleGroupSchema: z.ZodType<ExtensionRuleGroup> = z.object(
  {
    comment: z.string().optional(),
    entries: z.record(z.string(), ruleOptionsSchema),
  },
);

export interface ExtensionRuleGroup {
  entries: Record<string, RuleOptions>;
  comment?: string | undefined;
}

export const extensionPluginsSchema: z.ZodType<ExtensionPlugins> = z.record(
  z.string(),
  z.string(),
);

export type ExtensionPlugins = Record<string, string>;

export const rulesArraySchema = z.array(extensionRuleGroupSchema);

export type RulesArray = ExtensionRuleGroup[];

export const rulesRecordSchema: z.ZodType<RulesRecord> = z.record(
  z.string(),
  ruleOptionsSchema,
);

export type RulesRecord = Record<string, RuleOptions>;

export const extensionRulesSchema: z.ZodType<ExtensionRules> = z.union([
  rulesArraySchema,
  rulesRecordSchema,
]);

export type ExtensionRules = ExtensionRuleGroup[] | RulesRecord;

export const extensionSchema: z.ZodType<Extension> = z.object({
  extends: z.array(z.string()).optional(),
  files: z.array(z.string()),
  languageOptions: z.unknown().optional(),
  linterOptions: z.unknown().optional(),
  plugins: extensionPluginsSchema.optional(),
  rules: extensionRulesSchema.optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
});

export interface Extension {
  files: string[];
  extends?: string[] | undefined;
  languageOptions?: unknown;
  linterOptions?: unknown;
  plugins?: ExtensionPlugins | undefined;
  rules?: ExtensionRules | undefined;
  settings?: Record<string, unknown> | undefined;
}

export const packageImportSchema: z.ZodType<PackageImport> = z.object({
  source: z.union([
    z.string(),
    z.object({ packageName: z.string(), version: z.string() }),
  ]),
  specifier: z.string(),
  types: z.boolean().optional(),
});

export interface PackageImport {
  source:
    | string
    | {
        packageName: string;
        version: string;
      };
  specifier: string;
  types?: boolean | undefined;
}
