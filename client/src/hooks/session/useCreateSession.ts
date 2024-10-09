import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import axios from '@/api/axios/axios'

const createSession = async (sessionData): Promise<void> => {
  await axios.post('/api/sessions', sessionData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export const useCreateSession = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    }
  })
}
