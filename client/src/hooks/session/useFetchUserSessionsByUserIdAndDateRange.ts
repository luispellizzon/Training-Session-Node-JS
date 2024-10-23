import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/api/axios/axios'
import { UserSessions } from '@/schemas/types/SessionModel'
type GetSessionsByUserIdAndDateRangeProps = {
  user_id: string;
  dateRange: {
    from?: Date | undefined;
    to?: Date | undefined;
  };
}
const getSessionsByUserIdAndDateRange = async ({ user_id, dateRange }: GetSessionsByUserIdAndDateRangeProps): Promise<UserSessions> => {
  const endDate = dateRange.to ? new Date(dateRange.to) : undefined
  endDate?.setDate(endDate.getDate() + 1)
  const { data } = await axios.post<UserSessions>(`/api/user/${user_id}/sessions`,
    {
      from: dateRange.from,
      to: endDate
    },
  )
  return data
}


export const useFetchUserSessionsByUserIdAndDateRange = () => {
  const queryClient = useQueryClient()
  return useMutation<UserSessions, Error, GetSessionsByUserIdAndDateRangeProps>({
    // mutationKey: ['user-session-report'],
    mutationFn: getSessionsByUserIdAndDateRange,
    onSuccess: (data) => {
      queryClient.setQueryData(['user-session-report'], data)
    }
  })
}


