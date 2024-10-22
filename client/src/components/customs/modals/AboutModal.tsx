import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function AboutModal() {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <p className="text-white border-b-[2px] px-2 py-[0.5px] hover:text-gray-400 hover:border-gray-400">
            About
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-2 text-left">About</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
