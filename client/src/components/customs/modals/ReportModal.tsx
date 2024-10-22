import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { GetSessionsByUserIdAndDateRangeForm } from '../forms/get-sessions-by-user-id-and-date-range/GetSessionsByUserIdAndDateRangeForm';

export function ReportModal() {
  // const [query, updateDateRange] = useFetchUsers();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <p className="text-white border-b-[2px] px-2 py-[0.5px] hover:text-gray-400 hover:border-gray-400">
            User Report
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Report on Training Sessions</DialogTitle>
          <DialogDescription>
            To display all sessions from a user given a specific time range, enter the required
            details below and click submit.
          </DialogDescription>
          <GetSessionsByUserIdAndDateRangeForm setOpenModal={setOpen} />
          {/* <DataTable columns={columns} data={query.data ?? []} isPending={query.isPending} /> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
