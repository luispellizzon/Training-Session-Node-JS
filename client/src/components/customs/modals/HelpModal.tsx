import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircleIcon } from 'lucide-react';

export function HelpModal() {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button size={'sm'} className="text-white p-0 hover:text-gray-400">
          <HelpCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-2 text-left">Help</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
