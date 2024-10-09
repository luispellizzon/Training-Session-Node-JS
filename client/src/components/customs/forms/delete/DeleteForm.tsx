/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  deleteUserSchema,
  DeleteUserSchema,
} from '@/schemas/user/deleteUserSchema';

import { useDeleteAccount } from '@/hooks/account/useDeleteAccount';

type DeleteUserProps = {
  user_id?: string;
  role: 'user';
  changeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteForm({ user_id, changeDialogOpen }: DeleteUserProps) {
  const { mutateAsync, isPending } = useDeleteAccount();
  const form = useForm<DeleteUserSchema>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      delete: undefined,
    },
  });

  const onSubmit = (): void => {
    const promise = mutateAsync({
      user_id,
    });
    toast.promise(promise, {
      loading: 'Deleting account...',
      success: () => {
        form.reset();
        changeDialogOpen(false);
        return 'User was deleted';
      },
      error: (error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          return error.response.data.error;
        }
        return 'Error while deleting user';
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 py-5">
          <FormField
            control={form.control}
            name="delete"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">
                  Type "DELETE" to complete action.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="italic font-normal" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex">
          <Button
            variant={'destructive'}
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-[75%] mx-auto"
          >
            {isPending ? 'Deleting account...' : 'Confirm'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
