import axios from '@/api/axios/axios'
import { UserModel } from '@/schemas/types/UserModel'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export type DateRangeInputs = {
  startDate: string | undefined,
  endDate: string | undefined
}

const fetchUsers = async (dates: DateRangeInputs) => {
  if (!dates.startDate || !dates.endDate) throw new Error('Date range is not set')
  const response = await axios.get('/api/users', {
    params: {
      ...dates
    }
  })
  return response.data as UserModel[]
}

const refreshDate = () => {
  const start = new Date()
  const end = new Date()
  return {
    startDate: `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`,
    endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate() + 1}`
  }
}

const useFetchUsers = (): [
  UseQueryResult<UserModel[], Error>,
  (dates: DateRangeInputs) => void,
  dateRange: DateRangeInputs | null
] => {
  const [dateRange, setDateRange] = useState<DateRangeInputs | null>(refreshDate())

  const query = useQuery<UserModel[], Error>({
    queryKey: ['users', dateRange],
    queryFn: () => {
      if (!dateRange || dateRange.startDate === undefined || !dateRange.endDate === undefined) throw new Error('Date range is not set')
      return fetchUsers(dateRange)
    },
    meta: {
      errorMessage: 'Failed to fetch users'
    },
    staleTime: Infinity
  })

  const updateDateRange = (dates: DateRangeInputs) => {
    if (dates.startDate === dateRange?.startDate &&
      dates.endDate === dateRange?.endDate) return
    setDateRange(dates)
  }

  return [query, updateDateRange, dateRange]
}

export default useFetchUsers
