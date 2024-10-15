import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SessionModel } from '@/schemas/types/SessionModel';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useDeleteSession } from '@/hooks/session/useDeleteSession';
import { toast } from 'sonner';

type SessionCardProps = {
  session: SessionModel;
};
export const SessionCard = ({ session }: SessionCardProps) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteSession();
  const sessionDate = new Date(session.bookingDate);
  const sessionTime = `${sessionDate.getHours() > 9 ? sessionDate.getHours() : '0' + sessionDate.getHours()}:${sessionDate.getMinutes() < 9 ? '0' + sessionDate.getMinutes() : sessionDate.getMinutes()}`;

  const handleOnClick = () => {
    const promise = mutateAsync(session._id);
    toast.promise(promise, {
      loading: 'Creating a new training session...',
      success: () => {
        setOpen(false);
        return 'Training session deleted!';
      },
      error: (error) => {
        if (error.response && error.response.data && error.response.data.error) {
          return error.response.data.error.message;
        }
        return 'Error deleting training session';
      },
    });
  };
  return (
    <div className="bg-white rounded-md p-4 shadow-sm hover:shadow-lg hover:cursor-pointer max-w-md">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl">
          Date:{' '}
          <span className="text-lg font-semibold">
            {new Date(sessionDate).toLocaleDateString()}
          </span>
        </h2>
        <h2 className="font-bold text-xl">
          Time: <span className="font-semibold text-lg">{sessionTime}</span>
        </h2>
      </div>
      <ul className="pt-2">
        <h2 className="font-bold text-xl">Facilities</h2>
        {session.facilities.map((place) => (
          <li key={place} className="flex flex-row items-center gap-1 pl-2">
            <CheckCircle size={15} className="text-purple-600" /> {place}
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-end gap-2">
        <Button
          variant={'default'}
          className="flex flex-row gap-1 text-xs bg-blue-500 hover:bg-blue-700"
        >
          <Edit size={20} />
          Edit
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={'destructive'} className="flex flex-row gap-1 text-xs">
              <Trash2Icon size={20} />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete Training Session?</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-row justify-end gap-2">
              <Button variant={'destructive'} type="button" onClick={handleOnClick}>
                {isPending ? 'Deleting training session...' : 'Delete'}
              </Button>
              <Button variant={'default'} type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
