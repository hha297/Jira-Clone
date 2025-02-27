import { z } from 'zod';

export const signInSchema = z.object({
        email: z.string().email(),
        password: z.string().min(1, 'Password is required'),
});

// Define form schema for validation
export const signUpSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(256),
});
