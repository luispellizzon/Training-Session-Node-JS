import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import axios from '@/api/axios/axios'

const deleteSession = async (session_id: string): Promise<void> => {
    await axios.delete(`/api/sessions/${session_id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const useDeleteSession = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sessions'] })
        }
    })
}
