import { z } from 'zod';
import { TaskStatus } from './type';

export const createTaskSchema = z.object({
        name: z.string().trim().min(1, { message: 'Name is required' }),
        status: z.nativeEnum(TaskStatus, { required_error: 'Status is required' }),
        workspaceId: z.string().trim().min(1, { message: 'Workspace ID is required' }),
        projectId: z.string().trim().min(1, { message: 'Project ID is required' }),
        dueDate: z.coerce.date(),
        assigneeId: z.string().trim().min(1, { message: 'Assignee ID is required' }),
        description: z.string().optional(),
});
