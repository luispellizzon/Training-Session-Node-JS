import { z } from 'zod'
export const createSessionSchema = z.object({
  bookingDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? "Please choose a valid date!" : defaultError,
    }),
  }).refine((date) => {
    const userDate = new Date(date)
    const currentDate = new Date()
    return userDate.getDate() > currentDate.getDate() - 1
  }, { message: "Booking date must be in the future." }),
  facilities: z
    .array(z.enum(['Gym', 'Pool', 'Yoga', 'Spa']))
    .min(1, { message: "At least one facility must be selected." }),

})

export type CreateSessionSchemaModel = z.infer<typeof createSessionSchema>