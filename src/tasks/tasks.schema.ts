import {z} from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(3),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

export type createTaskInput = z.infer<typeof createTaskSchema>;