import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import axios from '@/api/axios/axios'
import { LoginModel } from '@/schemas/login/loginSchema'
import { AuthModel } from '@/schemas/types/AuthModel'

const login = async (loginData: LoginModel): Promise<AuthModel> => {
  const response = await axios.post('/api/login',
    loginData
  )
  return response.data as AuthModel
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation<AuthModel, Error, LoginModel>({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryDefaults(['auth'], {
        staleTime: Infinity
      })
      queryClient.setQueryData(['auth'], data)
      localStorage.setItem('token', data.accessToken)
    }
  })
}
