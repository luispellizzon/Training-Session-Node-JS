/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  CreateSessionSchemaModel,
  createSessionSchema,
} from '@/schemas/session/createSessionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateSession } from '@/hooks/session/useCreateSession';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Spinner } from '../../spinner/Spinner';

export function CreateSessionForm() {
  const { mutateAsync, isPending } = useCreateSession();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const form = useForm<CreateSessionSchemaModel>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      bookingDate: undefined,
      facilities: [],
    },
  });

  const onSubmit: SubmitHandler<CreateSessionSchemaModel> = (data): void => {
    console.log(data);
    setIsPopoverOpen(false);
    const promise = mutateAsync(data);
    toast.promise(promise, {
      loading: 'Creating a new training session...',
      success: () => {
        form.reset();
        return 'New training session created';
      },
      error: (error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          return error.response.data.error.message;
        }
        return 'Error creating training session';
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 pt-5 relative"
      >
        <FormField
          control={form.control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select a Date</FormLabel>
              <FormDescription>
                The date you want to create your training session.
              </FormDescription>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(value) => {
                      field.onChange(value);
                      setIsPopoverOpen(false);
                    }}
                    initialFocus
                    className="rounded-md border bg-white"
                  />
                </PopoverContent>
              </Popover>
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
                  Select the facilities you want to book your training session.
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
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
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
          <Button
            type="submit"
            disabled={isPending}
            className="w-[75%] mx-auto"
          >
            {isPending ? (
              <span className="flex gap-2">
                <Spinner />
                {'Creating new training session...'}
              </span>
            ) : (
              'Create New Session'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
