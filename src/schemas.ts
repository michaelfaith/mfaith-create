import { z } from 'zod';

export const contributorSchema: z.ZodType<Contributor> = z.object({
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

export const guideLinkSchema: z.ZodType<GuideLink> = z.object({
  href: z.string(),
  title: z.string(),
});
export interface GuideLink {
  href: string;
  title: string;
}

export const nodeVersionsSchema: z.ZodType<NodeVersions> = z.object({
  supported: z.string(),
  pinned: z.string().optional(),
});
export interface NodeVersions {
  supported: string;
  pinned?: string | undefined;
}

export const labelSchema: z.ZodType<Label> = z.object({
  color: z.string(),
  description: z.string().optional(),
  name: z.string(),
});
export interface Label {
  color: string;
  description?: string | undefined;
  name: string;
}

export const logoSchema: z.ZodType<Logo> = z.object({
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

export const documentationSchema: z.ZodType<Documentation> = z.object({
  development: z.string().optional(),
  readme: readmeSchema,
});
export interface Documentation {
  readme: Readme;
  development?: string | undefined;
}

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

export const workflowsVersionsSchema: z.ZodType<WorkflowsVersions> = z.record(
  z.string(),
  workflowVersionsSchema,
);
export type WorkflowsVersions = Record<string, WorkflowVersions>;
