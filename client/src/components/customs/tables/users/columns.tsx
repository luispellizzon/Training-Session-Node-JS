import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { UserInformation } from './UserInformation';
import { DeletionDialog } from '../../modals/DeletionDialog';
import { UserModel } from '@/schemas/types/UserModel';

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: 'username',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 flex gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Registered At
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = new Date(row.getValue('createdAt'));
      const dateFormatted = `${value.getDate() < 10 ? '0' + value.getDate() : value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
      return <div>{dateFormatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <UserInformation user={user} />
            <DeletionDialog user_id={user.user_id} role="user" />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
