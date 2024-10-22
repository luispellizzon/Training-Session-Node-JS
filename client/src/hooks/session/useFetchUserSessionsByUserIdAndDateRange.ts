import { useMutation } from '@tanstack/react-query'
import axios from '@/api/axios/axios'
import { SessionModel } from '@/schemas/types/SessionModel'
type GetSessionsByUserIdAndDateRangeProps = {
  user_id: string;
  dateRange: {
    from?: Date | undefined;
    to?: Date | undefined;
  };
}
const getSessionsByUserIdAndDateRange = async ({ user_id, dateRange }: GetSessionsByUserIdAndDateRangeProps): Promise<SessionModel[]> => {
  const { data } = await axios.post<SessionModel[]>(`/api/user/${user_id}/sessions`,
    {
      from: dateRange.from,
      to: dateRange.to
    },
  )
  return data
}


export const useFetchUserSessionsByUserIdAndDateRange = () => {
  // const queryClient = useQueryClient()
  return useMutation<SessionModel[], Error, GetSessionsByUserIdAndDateRangeProps>({
    mutationKey: ['user-session-report'],
    mutationFn: getSessionsByUserIdAndDateRange,
  })
}


