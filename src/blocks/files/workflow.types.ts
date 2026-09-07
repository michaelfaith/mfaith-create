import { z } from "zod";

export interface WorkflowPermissions {
  contents?: string;
  discussions?: string;
  "id-token"?: string;
  issues?: string;
  "pull-requests"?: string;
}

export const zWorkflowPermissions: z.ZodType<WorkflowPermissions> = z.object({
  contents: z.string().optional(),
  discussions: z.string().optional(),
  "id-token": z.string().optional(),
  issues: z.string().optional(),
  "pull-requests": z.string().optional(),
});
