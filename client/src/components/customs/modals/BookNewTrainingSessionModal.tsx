import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreateSessionForm } from '../forms/create-session/CreateSessionForm';
import { Plus } from 'lucide-react';
export const BookNewTrainingSessionModal = () => {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center gap-2"
          size={'sm'}
        >
          <Plus size={18} />
          New Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Training Session</DialogTitle>
          <DialogDescription>
            To book a new training session, enter the required details below and
            click submit.
          </DialogDescription>
          <CreateSessionForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
