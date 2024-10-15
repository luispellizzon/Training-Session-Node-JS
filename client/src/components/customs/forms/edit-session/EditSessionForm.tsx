import { useEditSession } from '@/hooks/session/useEditSession';
import { SessionModel } from '@/schemas/types/SessionModel';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PopoverContent } from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '../../spinner/Spinner';
import React, { SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditSessionModel, editSessionSchema } from '@/schemas/session/editSessionSchema';

type EditSessionFormProps = {
  session: SessionModel;
  setEditButtonOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const EditSessionForm = ({ session, setEditButtonOpen }: EditSessionFormProps) => {
  const { mutateAsync, isPending } = useEditSession();
  const [alreadyBookedError, setAlreadyBookedError] = useState<string>();
  const form = useForm<EditSessionModel>({
    resolver: zodResolver(editSessionSchema),
    defaultValues: {
      bookingDate: new Date(session.bookingDate),
      facilities: session.facilities,
    },
  });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue('bookingDate', date);
    }
  }

  function handleTimeChange(type: 'hour' | 'minute', value: string) {
    const currentDate = form.getValues('bookingDate') || new Date();
    let newDate = new Date(currentDate);

    if (type === 'hour') {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue('bookingDate', newDate);
  }

  const onSubmit: SubmitHandler<EditSessionModel> = (data): void => {
    const sessionEdits = data;

    const promise = mutateAsync({ session, sessionEdits });
    toast.promise(promise, {
      loading: 'Updating training session...',
      success: () => {
        form.reset();
        setEditButtonOpen(false);
        return 'Training session updated!';
      },
      error: (error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setAlreadyBookedError(error.response.data.error.message);
          return error.response.data.error.message;
        }
        return 'Error updating training session';
      },
    });
  };

  const items = [
    {
      id: 'Gym',
      label: 'Gym',
    },
    {
      id: 'Pool',
      label: 'Pool',
    },
    {
      id: 'Yoga',
      label: 'Yoga',
    },
    {
      id: 'Spa',
      label: 'Spa',
    },
  ] as const;
  return (
    <Form {...form}>
      {<p className="text-red-500 text-lg text-center">{alreadyBookedError}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative">
        <FormField
          control={form.control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">Enter your date & time (24h)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      type="button"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'MM/dd/yyyy HH:mm')
                      ) : (
                        <span>MM/DD/YYYY HH:mm</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border rounded">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={handleDateSelect}
                      className="bg-white"
                      initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2 border-l-[1px]">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                type="button"
                                size="icon"
                                variant={
                                  field.value && field.value.getHours() === hour
                                    ? 'default'
                                    : 'ghost'
                                }
                                className="sm:w-full shrink-0 aspect-square cursor-pointer"
                                onClick={() => handleTimeChange('hour', hour.toString())}
                              >
                                {hour}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                            <Button
                              key={minute}
                              type="button"
                              size="icon"
                              variant={
                                field.value && field.value.getMinutes() === minute
                                  ? 'default'
                                  : 'ghost'
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange('minute', minute.toString())}
                            >
                              {minute.toString().padStart(2, '0')}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Please select your <span className="font-semibold">NEW</span> preferred date and
                time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facilities"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Facilities</FormLabel>
                <FormDescription>
                  Select the <span className="font-semibold">NEW</span> facilities you want to book
                  your training session.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="facilities"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button type="submit" disabled={isPending} className="w-[75%] mx-auto">
            {isPending ? (
              <span className="flex gap-2">
                <Spinner />
                {'Updating training session...'}
              </span>
            ) : (
              'Update Training Session'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
