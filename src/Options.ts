import type { InferredObject } from 'bingo';
import { z } from 'zod';

const accessSchema: z.ZodType<Access> = z.union([
  z.literal('public'),
  z.literal('restricted'),
]);
export type Access = 'public' | 'restricted';

const authorSchema: z.ZodType<string> = z.string();

const contactSchema: z.ZodType<Contact> = z.union([
  z.string(),
  z.object({
    bluesky: z.string().optional(),
    email: z.string().optional(),
    url: z.string().optional(),
  }),
]);
export type Contact =
  | string
  | {
      bluesky?: string | undefined;
      email?: string | undefined;
      url?: string | undefined;
    };

const contributorSchema: z.ZodType<Contributor> = z.object({
  avatar_url: z.string(),
  contributions: z.array(z.string()),
  login: z.string(),
  name: z.string(),
  profile: z.string(),
});
export interface Contributor {
  avatar_url: string;
  contributions: string[];
  login: string;
  name: string;
  profile: string;
}

const contributorsSchema: z.ZodType<Contributors> = z.array(contributorSchema);
export type Contributors = Contributor[];

const descriptionSchema: z.ZodType<string> = z.string();
const devExportsSchema: z.ZodType<boolean> = z.boolean();
const directorySchema: z.ZodType<string> = z.string();

const readmeSchema: z.ZodType<Readme> = z.object({
  additional: z.string().optional(),
  explainer: z.string().optional(),
  footnotes: z.string().optional(),
  usage: z.string().optional(),
});
export interface Readme {
  additional?: string | undefined;
  explainer?: string | undefined;
  footnotes?: string | undefined;
  usage?: string | undefined;
}

const documentationSchema: z.ZodType<Documentation> = z.object({
  development: z.string().optional(),
  readme: readmeSchema,
});
export interface Documentation {
  readme: Readme;
  development?: string | undefined;
}

const emojiSchema = z.string();

const labelSchema: z.ZodType<Label> = z.object({
  color: z.string(),
  description: z.string().optional(),
  name: z.string(),
});
export interface Label {
  color: string;
  description?: string | undefined;
  name: string;
}

const existingLabelsSchema: z.ZodType<ExistingLabels> = z.array(labelSchema);
export type ExistingLabels = Label[];

const logoSchema: z.ZodType<Logo> = z.object({
  alt: z.string(),
  height: z.number().optional(),
  src: z.string(),
  width: z.number().optional(),
});
export interface Logo {
  alt: string;
  height?: number | undefined;
  src: string;
  width?: number | undefined;
}

const nodeVersionsSchema: z.ZodType<NodeVersions> = z.object({
  supported: z.string(),
  pinned: z.string().optional(),
});
export interface NodeVersions {
  supported: string;
  pinned?: string | undefined;
}

const guideLinkSchema: z.ZodType<GuideLink> = z.object({
  href: z.string(),
  title: z.string(),
});
export interface GuideLink {
  href: string;
  title: string;
}

const keywordsSchema: z.ZodType<Keywords> = z.array(z.string());
export type Keywords = string[];

const ownerSchema: z.ZodType<string> = z.string();

const packageDataSchema: z.ZodType<PackageData> = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
  peerDependencies: z.record(z.string(), z.string()).optional(),
  peerDependenciesMeta: z.record(z.string(), z.unknown()).optional(),
  scripts: z.record(z.string(), z.string().optional()).optional(),
});
export interface PackageData {
  dependencies?: Record<string, string> | undefined;
  devDependencies?: Record<string, string> | undefined;
  peerDependencies?: Record<string, string> | undefined;
  peerDependenciesMeta?: Record<string, unknown> | undefined;
  scripts?: Record<string, string | undefined> | undefined;
}

const packageNameSchema: z.ZodType<string> = z.string();
const pnpmSchema: z.ZodType<string> = z.string();
const repositorySchema: z.ZodType<string> = z.string();
const rulesetIdSchema: z.ZodType<string> = z.string();
const titleSchema: z.ZodType<string> = z.string();
const versionSchema: z.ZodType<string> = z.string();

const wordsSchema: z.ZodType<Words> = z.array(z.string());
export type Words = string[];

const workflowVersionSchema: z.ZodType<WorkflowVersion> = z.object({
  hash: z.string().optional(),
  pinned: z.boolean().optional(),
});
export interface WorkflowVersion {
  hash?: string | undefined;
  pinned?: boolean | undefined;
}

const workflowVersionsSchema: z.ZodType<WorkflowVersions> = z.record(
  z.string(),
  workflowVersionSchema,
);
export type WorkflowVersions = Record<string, WorkflowVersion>;

const workflowsVersionsSchema: z.ZodType<WorkflowsVersions> = z.record(
  z.string(),
  workflowVersionsSchema,
);
export type WorkflowsVersions = Record<string, WorkflowVersions>;

export const optionsShape: OptionsShape = {
  access: accessSchema.describe(
    'which `npm publish --access` to release npm packages with',
  ),
  author: authorSchema
    .optional()
    .describe('username on npm to publish packages under'),
  contact: contactSchema
    .transform((email) => (typeof email === 'string' ? { email } : email))
    .describe(
      'contact information to be listed as the point of contact in docs and packages',
    ),
  contributors: contributorsSchema
    .optional()
    .describe('AllContributors contributors to store in .all-contributorsrc'),
  description: descriptionSchema
    .default('A very lovely package. Hooray!')
    .describe("'Sentence case.' description of the repository"),
  devExports: devExportsSchema
    .default(false)
    .describe(
      'whether or not to generate dev exports and use `publishConfig` for exports and bin entries',
    ),
  directory: directorySchema.describe('Directory to create the repository in'),
  documentation: documentationSchema.describe(
    'additional docs to add to .md files',
  ),
  emoji: emojiSchema
    .optional()
    .describe('decorative emoji to use in descriptions and docs'),
  existingLabels: existingLabelsSchema
    .optional()
    .describe('existing labels from the GitHub repository'),
  funding: z
    .string()
    .optional()
    .describe('GitHub organization or username to mention in `funding.yaml`'),
  guide: guideLinkSchema
    .optional()
    .describe(
      'link to a contribution guide to place at the top of development docs',
    ),
  keywords: keywordsSchema
    .optional()
    .describe('any number of keywords to include in `package.json`'),
  logo: logoSchema
    .optional()
    .describe(
      'local image file and alt text to display near the top of the README.md',
    ),
  node: nodeVersionsSchema.describe(
    'Node.js engine version(s) to pin and support',
  ),
  owner: ownerSchema.describe('organization or user owning the repository'),
  packageData: packageDataSchema
    .optional()
    .describe('additional properties to include in `package.json`'),
  packageName: packageNameSchema
    .optional()
    .describe('name of the package to publish to npm'),
  pnpm: pnpmSchema
    .optional()
    .describe("pnpm version for package.json's packageManager field"),
  repository: repositorySchema.describe(
    "'kebab-case' or 'PascalCase' title of the repository",
  ),
  rulesetId: rulesetIdSchema
    .optional()
    .describe('GitHub branch ruleset ID for main branch protections'),
  title: titleSchema.describe("'Title Case' title for the repository"),
  version: versionSchema
    .optional()
    .describe('package version to publish as and store in `package.json`'),
  words: wordsSchema
    .optional()
    .describe('additional words to add to the CSpell dictionary'),
  workflowsVersions: workflowsVersionsSchema
    .optional()
    .describe('existing versions of GitHub Actions workflows used'),
};
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type OptionsShape = {
  access: z.ZodType<Access>;
  author: z.ZodOptional<z.ZodType<string>>;
  contact: z.ZodPipe<
    z.ZodType<Contact>,
    z.ZodTransform<
      {
        bluesky?: string | undefined;
        email?: string | undefined;
        url?: string | undefined;
      },
      Contact
    >
  >;
  contributors: z.ZodOptional<z.ZodType<Contributors>>;
  description: z.ZodDefault<z.ZodType<string>>;
  devExports: z.ZodDefault<z.ZodType<boolean>>;
  directory: z.ZodType<string>;
  documentation: z.ZodType<Documentation>;
  emoji: z.ZodOptional<z.ZodString>;
  existingLabels: z.ZodOptional<z.ZodType<ExistingLabels>>;
  funding: z.ZodOptional<z.ZodString>;
  guide: z.ZodOptional<z.ZodType<GuideLink>>;
  keywords: z.ZodOptional<z.ZodType<Keywords>>;
  logo: z.ZodOptional<z.ZodType<Logo>>;
  node: z.ZodType<NodeVersions>;
  owner: z.ZodType<string>;
  packageData: z.ZodOptional<z.ZodType<PackageData>>;
  packageName: z.ZodOptional<z.ZodType<string>>;
  pnpm: z.ZodOptional<z.ZodType<string>>;
  repository: z.ZodType<string>;
  rulesetId: z.ZodOptional<z.ZodType<string>>;
  title: z.ZodType<string>;
  version: z.ZodOptional<z.ZodType<string>>;
  words: z.ZodOptional<z.ZodType<Words>>;
  workflowsVersions: z.ZodOptional<z.ZodType<WorkflowsVersions>>;
};

// May not be able to use the `InferredObject` type with `isolatedDeclarations`...?
// We'll see.
export type Options = InferredObject<OptionsShape>;

// export interface Options {
//   access: Access;
//   contact: {
//     bluesky?: string | undefined;
//     email?: string | undefined;
//     url?: string | undefined;
//   };
//   description: string;
//   devExports: boolean;
//   directory: string;
//   documentation: Documentation;
//   node: NodeVersions;
//   owner: string;
//   repository: string;
//   title: string;
//   author?: string | undefined;
//   contributors?: Contributors | undefined;
//   emoji?: string | undefined;
//   existingLabels?: ExistingLabels | undefined;
//   funding?: string | undefined;
//   guide?: GuideLink | undefined;
//   keywords?: Keywords | undefined;
//   logo?: Logo | undefined;
//   packageData?: PackageData | undefined;
//   packageName?: string | undefined;
//   pnpm?: string | undefined;
//   rulesetId?: string | undefined;
//   version?: string | undefined;
//   words?: Words | undefined;
//   workflowsVersions?: WorkflowsVersions | undefined;
// }
