import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { UserModel } from '@/schemas/types/UserModel';

type UserInformationProps = {
  user: UserModel;
};

export function UserInformation({ user }: UserInformationProps) {
  const date = new Date(user.createdAt);
  const userDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Information</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>Below you can find the following user information:</DialogDescription>
        </DialogHeader>
        <ul className="text-base flex flex-col gap-2">
          <li className="font-bold">
            Name: <span className="font-normal pl-2">{user.username}</span>
          </li>
          <li className="font-bold">
            Email: <span className="font-normal pl-2">{user.email}</span>
          </li>
          <li className="font-bold">
            Registered At: <span className="font-normal pl-2">{userDate}</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
