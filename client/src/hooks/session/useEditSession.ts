import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import axios from '@/api/axios/axios'
import { SessionModel } from '@/schemas/types/SessionModel'
import { EditSessionModel } from '@/schemas/session/editSessionSchema'


type EditSessionParams = {
    session: SessionModel;
    sessionEdits: EditSessionModel;
}

const editSession = async ({ session, sessionEdits }: EditSessionParams): Promise<void> => {
    await axios.patch(`/api/sessions/${session._id}`, {
        bookingDate: sessionEdits.bookingDate,
        facilities: sessionEdits.facilities
    }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const useEditSession = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: editSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sessions'] })
        }
    })
}
