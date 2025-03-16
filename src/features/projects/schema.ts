import { z } from 'zod';

export const createProjectSchema = z.object({
        name: z.string().trim().min(1, { message: 'Name is required' }),
        image: z
                .union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))])
                .optional(),
        workspaceId: z.string(),
});

export const createProjectFormSchema = z.object({
        name: z.string(),
        image: z.optional(z.string().or(z.instanceof(File))),
});
