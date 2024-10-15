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
    .array(z.enum(['Gym', 'Pool', 'Yoga', 'Spa', "Sauna"]))
    .min(1, { message: "At least one facility must be selected." }),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits").refine((cvv) => cvv !== "000", { message: "CVV must be valid" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Expiry date must be in MM/YY format")
    .refine((date) => date.split("/")[0] >= (new Date().getMonth() + 1).toString() && date.split("/")[1] >= new Date().getFullYear().toString().slice(2), { message: "Expiry date must be in the future." }),

})

export type CreateSessionSchemaModel = z.infer<typeof createSessionSchema>
