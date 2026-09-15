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
