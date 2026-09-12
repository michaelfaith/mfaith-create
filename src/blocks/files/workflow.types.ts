import { z } from 'zod';

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

export const zWorkflowPermissions: z.ZodType<WorkflowPermissions> = z.object({
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

export type WorkflowStep = {
  env?: Record<string, string>;
  id?: string;
  if?: string;
  name?: string;
} & (
  | { run: string }
  | { uses: string; with?: Record<string, boolean | number | string> }
);

export interface WorkflowJob {
  id?: string;
  if?: string;
  name: string;
  needs?: string;
  outputs?: Record<string, string>;
  permissions?: WorkflowPermissions;
  'runs-on'?: string;
  steps: WorkflowStep[];
}

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
