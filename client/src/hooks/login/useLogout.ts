import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

const logout = async () => {
  localStorage.removeItem('token')
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries()
    }
  })
}
