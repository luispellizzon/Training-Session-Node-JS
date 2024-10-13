import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import axios from '@/api/axios/axios'
import { AuthModel } from '@/schemas/types/AuthModel'
import { RegistrationModel } from '@/schemas/registration/registrationSchema'
import { AxiosError } from 'axios'

const registerUser = async (registrationData: RegistrationModel): Promise<AuthModel> => {
  try {
    const response = await axios.post('/api/signup',
      registrationData
    )
    return response.data as AuthModel
  } catch (e: any | AxiosError) {
    throw e.response.data.error
  }

}

export const useRegistration = () => {
  const queryClient = useQueryClient()
  return useMutation<AuthModel, AxiosError, RegistrationModel>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.setQueryDefaults(['auth'], {
        staleTime: Infinity
      })
      queryClient.setQueryData(['auth'], data)
      localStorage.setItem('token', data.accessToken)
    }
  })
}
