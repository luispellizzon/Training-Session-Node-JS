import useFetchUsers from '@/hooks/user/useFetchUsers';
import { DataTable } from '../main/DataTable';
import { columns } from './columns';
import { DatePickerWithRange } from '../../date-picker/DateRangePicker';

export const UsersTable = () => {
  const [query, updateDateRange] = useFetchUsers();

  return (
    <div className="container mx-auto py-10">
      <DatePickerWithRange
        refetch={updateDateRange}
        isPending={query.isPending}
      />
      <DataTable
        columns={columns}
        data={query.data ?? []}
        isPending={query.isPending}
      />
    </div>
  );
};
