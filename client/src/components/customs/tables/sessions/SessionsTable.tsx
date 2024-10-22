import { DataTable } from '../main/DataTable';
import { columns } from './columns';
import { DatePickerWithRange } from '../../date-picker/DateRangePicker';
import useFetchUserSessionsByUserIdAndDate from '@/hooks/session/useFetchUserSessionsByUserIdAndDate';
import { Input } from '@/components/ui/input';

export const SessionsTable = () => {
  const [query, updateDateRange] = useFetchUserSessionsByUserIdAndDate();

  return (
    <div className="container mx-auto py-10">
      <Input type="name" placeholder="Insert User ID" />
      {/* <DataTable columns={columns} data={query.data ?? []} isPending={query.isPending} /> */}
    </div>
  );
};
