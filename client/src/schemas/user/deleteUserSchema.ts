import { z } from 'zod'

export const deleteUserSchema = z.object({
  delete: z.union([
    z.literal('DELETE'),
    z.string().min(0)
  ]).refine((value) => value === 'DELETE', {
    message: "You must type 'DELETE' to confirm deletion.",
  }),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>
