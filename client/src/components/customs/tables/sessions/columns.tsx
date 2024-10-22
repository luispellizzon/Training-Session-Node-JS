import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { UserModel } from '@/schemas/types/UserModel';

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: 'bookingDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 flex gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Booking Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = new Date(row.getValue('bookingDate'));
      const dateFormatted = `${value.getDate() < 10 ? '0' + value.getDate() : value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
      return <div>{dateFormatted}</div>;
    },
  },
  {
    accessorKey: 'facilities',
    header: 'Facilities',
  },
  {
    accessorKey: 'Booking At',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0 flex gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Booking At
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
];
