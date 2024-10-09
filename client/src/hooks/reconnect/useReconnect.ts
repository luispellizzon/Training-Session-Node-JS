import {
  useQuery
} from '@tanstack/react-query'
import axios from '@/api/axios/axios'
import { AuthModel } from '@/schemas/types/AuthModel'

const reconnect = async (): Promise<AuthModel> => {
  const response = await axios.get('/api/me', {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data as AuthModel
}

export const useReconnect = () => {
  return useQuery<AuthModel, Error>({
    queryKey: ['auth'],
    queryFn: reconnect,
    refetchOnWindowFocus: 'always',
  },)
}
