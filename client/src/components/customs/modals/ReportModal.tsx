import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GetSessionsByUserIdAndDateRangeForm } from '../forms/get-sessions-by-user-id-and-date-range/GetSessionsByUserIdAndDateRangeForm';

export function ReportModal() {
  return (
    <Dialog>
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
        </DialogHeader>
        <GetSessionsByUserIdAndDateRangeForm />
      </DialogContent>
    </Dialog>
  );
}
