import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from '@/api/axios/axios'
import { toast } from 'sonner'
import { SessionModel } from '@/schemas/types/SessionModel'

const fetchUserSessions = async (): Promise<SessionModel[]> => {
  const { data } = await axios.get<SessionModel[]>('/api/sessions',
    {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  return data
}


const useFetchUserSessions = () => {
  // const queryClient = useQueryClient()
  const query = useQuery<SessionModel[], Error>({
    queryKey: ['sessions'],
    queryFn: fetchUserSessions,
    staleTime: Infinity
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Failed to fetch user sessions')
    }
  }, [query.error])
  return {
    query,
  }
}

export default useFetchUserSessions
