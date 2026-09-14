import { z } from 'zod';

export interface ActionInput {
  default?: boolean | number | string;
  description?: string;
  required?: boolean;
  type?: 'boolean' | 'number' | 'string';
}

export type Step = {
  env?: Record<string, string> | undefined;
  id?: string | undefined;
  if?: string | undefined;
  name?: string | undefined;
  with?: Record<string, boolean | number | string> | undefined;
} & (
  | {
      run: string;
      uses?: never;
    }
  | {
      run?: never;
      uses: string;
    }
);

export const stepSchema: z.ZodType<Step> = z.intersection(
  z.union([
    z.object({ run: z.string() }),
    z.object({
      uses: z.string(),
    }),
  ]),
  z.object({
    env: z.record(z.string(), z.string()).optional(),
    id: z.string().optional(),
    if: z.string().optional(),
    name: z.string().optional(),
    with: z
      .record(z.string(), z.union([z.boolean(), z.number(), z.string()]))
      .optional(),
  }),
);

interface WorkflowConcurrency {
  'cancel-in-progress'?: boolean;
  group: string;
}

export interface WorkflowPermissions {
  contents?: string;
  discussions?: string;
  'id-token'?: string;
  issues?: string;
  'pull-requests'?: string;
}

export const workflowPermissionsSchema: z.ZodType<WorkflowPermissions> =
  z.object({
    contents: z.string().optional(),
    discussions: z.string().optional(),
    'id-token': z.string().optional(),
    issues: z.string().optional(),
    'pull-requests': z.string().optional(),
  });

export interface WorkflowOn {
  discussion?: {
    types?: string[];
  };
  discussion_comment?: {
    types?: string[];
  };
  issue_comment?: {
    types?: string[];
  };
  issues?: {
    types?: string[];
  };
  pull_request?:
    | null
    | string
    | {
        branches?: string | string[];
        types?: string[];
      };
  pull_request_review_comment?: {
    types: string[];
  };
  pull_request_target?: {
    types: string[];
  };
  push?: {
    branches: string[];
  };
  release?: {
    types: string[];
  };
  workflow_dispatch?: null | string;
}

interface WorkflowJobStrategy {
  'fail-fast'?: boolean;
  matrix?: Record<string, (number | string)[]>;
}

const workflowJobStrategySchema: z.ZodType<WorkflowJobStrategy> = z.object({
  'fail-fast': z.boolean().optional(),
  matrix: z
    .record(z.string(), z.array(z.union([z.number(), z.string()])))
    .optional(),
});

export interface WorkflowJob {
  id?: string;
  if?: string;
  name: string;
  needs?: string;
  outputs?: Record<string, string>;
  permissions?: WorkflowPermissions;
  'runs-on'?: string;
  strategy?: WorkflowJobStrategy;
  steps: Step[];
}

export const workflowJobSchema: z.ZodType<WorkflowJob> = z.object({
  id: z.string().optional(),
  if: z.string().optional(),
  name: z.string(),
  needs: z.string().optional(),
  outputs: z.record(z.string(), z.string()).optional(),
  permissions: workflowPermissionsSchema.optional(),
  'runs-on': z.string().optional(),
  strategy: workflowJobStrategySchema.optional(),
  steps: z.array(stepSchema),
});

interface BaseWorkflow {
  concurrency?: WorkflowConcurrency;
  name: string;
  on?: WorkflowOn;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface SingleJobWorkflow extends BaseWorkflow {
  job: Optional<WorkflowJob, 'name'>;
}

export interface Workflow extends BaseWorkflow {
  jobs: WorkflowJob[];
}
