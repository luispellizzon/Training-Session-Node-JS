import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '../forms/login/LoginForm';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import RegistrationForm from '../forms/registration/RegistrationForm';
import { useState } from 'react';

export function LoginModal() {
  const [userAction, setUserAction] = useState<string>('sign-in');
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="gap-1 w-full text-black" size={'sm'}>
          <ArrowRight size={18} />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-2 text-left">
          {userAction === 'sign-in' && <LoginForm setUserAction={setUserAction} />}
          {userAction === 'sign-up' && <RegistrationForm setUserAction={setUserAction} />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
