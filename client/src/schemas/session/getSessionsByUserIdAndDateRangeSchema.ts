import { isDate, toDate } from 'date-fns';
import { z } from 'zod'
export const getSessionsByUserIdAndDateRangeFormSchema = z.object({
    user_id: z.string()
        .min(10, { message: "User ID must be at least 10 characters long" })
        .refine((user_id) => {
            return user_id.length > 0 && user_id[0].toUpperCase() === "R";
        }, { message: "User ID must start with 'R'" }),
    dateRange: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).refine(data => {
        const fromDate = data.from ? new Date(data.from) : undefined;
        const toDate = data.to ? new Date(data.to) : undefined;
        return isDate(fromDate) && isDate(toDate)
    }, { message: "Select both start and end dates." })
})


export type GetSessionsByUserIdAndDateRangeModel = z.infer<typeof getSessionsByUserIdAndDateRangeFormSchema>


