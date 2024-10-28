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
import { EditSessionForm } from '../forms/edit-session/EditSessionForm';
import { cn } from '@/lib/utils';

type SessionCardProps = {
  session: SessionModel;
  className: string;
  allowButtons: boolean;
};
export const SessionCard = ({ session, className, allowButtons }: SessionCardProps) => {
  const [deleteButtonOpen, setDeleteButtonOpen] = useState(false);
  const [editButtonOpen, setEditButtonOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteSession();
  const sessionDate = new Date(session.bookingDate);
  const sessionTime = `${sessionDate.getHours() > 9 ? sessionDate.getHours() : '0' + sessionDate.getHours()}:${sessionDate.getMinutes() < 9 ? '0' + sessionDate.getMinutes() : sessionDate.getMinutes()}`;

  const handleOnDeleteClick = () => {
    const promise = mutateAsync(session._id);
    toast.promise(promise, {
      loading: 'Deleting training session...',
      success: () => {
        setDeleteButtonOpen(false);
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
    <div
      className={cn(
        `bg-white rounded-sm p-4 shadow-sm hover:shadow-lg cursor-pointer max-w-md flex flex-col border-l-4`,
        className
      )}
    >
      <div className="flex flex-row justify-between gap-6">
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
      {allowButtons && (
        <div className="flex flex-row justify-end gap-2 mt-auto">
          {/* EDIT ACTION*/}
          <Dialog open={editButtonOpen} onOpenChange={setEditButtonOpen}>
            <DialogTrigger asChild>
              <Button
                variant={'default'}
                className="flex flex-row gap-1 text-xs bg-blue-500 hover:bg-blue-700"
              >
                <Edit size={20} />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Your Training Session</DialogTitle>
                <DialogDescription>
                  Want to change anything on your training session? Select your new training session
                  details below and click confirm.
                </DialogDescription>
              </DialogHeader>
              <EditSessionForm session={session} setEditButtonOpen={setEditButtonOpen} />
            </DialogContent>
          </Dialog>
          {/* DELETE ACTION*/}
          <Dialog open={deleteButtonOpen} onOpenChange={setDeleteButtonOpen}>
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
                <Button variant={'destructive'} type="button" onClick={handleOnDeleteClick}>
                  {isPending ? 'Deleting training session...' : 'Delete'}
                </Button>
                <Button
                  variant={'default'}
                  type="button"
                  onClick={() => setDeleteButtonOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};
