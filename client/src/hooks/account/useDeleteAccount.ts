import axios from '@/api/axios/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type DeletionData = {
  user_id?: string
}

const deleteAccount = async ({ user_id }: DeletionData) => {
  const response = await axios.delete(`/api/users/${user_id}`)
  return response.data
}

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
