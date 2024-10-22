import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '../../spinner/Spinner';
import { Input } from '@/components/ui/input';
import React, { SetStateAction } from 'react';
import {
  getSessionsByUserIdAndDateRangeFormSchema,
  GetSessionsByUserIdAndDateRangeModel,
} from '@/schemas/session/getSessionsByUserIdAndDateRangeSchema';
import { useFetchUserSessionsByUserIdAndDateRange } from '@/hooks/session/useFetchUserSessionsByUserIdAndDateRange';

type GetSessionsByUserIdAndDateRangeFormProps = {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
};
export function GetSessionsByUserIdAndDateRangeForm({
  setOpenModal,
}: GetSessionsByUserIdAndDateRangeFormProps) {
  const { mutateAsync, isPending } = useFetchUserSessionsByUserIdAndDateRange();
  const form = useForm<GetSessionsByUserIdAndDateRangeModel>({
    resolver: zodResolver(getSessionsByUserIdAndDateRangeFormSchema),
    defaultValues: {
      user_id: '',
    },
  });

  const onSubmit: SubmitHandler<GetSessionsByUserIdAndDateRangeModel> = (data): void => {
    const promise = mutateAsync(data);
    toast.promise(promise, {
      loading: `Fetching user's sessions...`,
      success: () => {
        form.reset();
        return 'Sessions fetched successfully!';
      },
      error: (error) => {
        if (error.response && error.response.data && error.response.data.error) {
          return error.response.data.error.message;
        }
        return `Error fetching user's training session`;
      },
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-5 relative">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="R000000000" type="text" {...field} />
                </FormControl>
                <FormMessage className="italic font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Range</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white border-[1px] rounded border-gray-400"
                      align="start"
                    >
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={
                          field.value?.from || field.value?.to
                            ? { from: field.value.from, to: field.value.to }
                            : undefined
                        }
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex">
          <Button type="submit" disabled={isPending} className="w-[75%] mx-auto">
            {isPending ? (
              <span className="flex gap-2">
                <Spinner />
                {'Fetching User Sessions...'}
              </span>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
