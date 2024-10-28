import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Spinner } from '../../spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { RegistrationModel, registrationSchema } from '@/schemas/registration/registrationSchema';
import { useRegistration } from '@/hooks/reconnect/useRegistration';

type RegistrationForm = {
  setUserAction: React.Dispatch<React.SetStateAction<string>>;
};
export default function RegistrationForm({ setUserAction }: RegistrationForm) {
  const { mutateAsync, isPending, isError, error } = useRegistration();
  const navigate = useNavigate();
  const form = useForm<RegistrationModel>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit: SubmitHandler<RegistrationModel> = async (data): Promise<void> => {
    const promise = mutateAsync({
      username: data.username,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
    toast.promise(promise, {
      loading: 'Registering your details...',
      success: () => {
        form.reset();
        navigate('/auth');
        return 'Welcome new user, you were successfully registered!';
      },
      error: () => {
        return 'Server Error';
      },
    });
  };

  return (
    <Card className="mx-auto max-w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Enter the following details below to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {isError && (
            <p className="text-destructive text-center font-medium">
              {error !== null && error.message}
            </p>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 pb-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="Enter your Name" {...field} />
                    </FormControl>
                    <FormMessage className="italic font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage className="italic font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="Enter your New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="italic font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isPending}
                        placeholder="Confirm your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="italic font-normal" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <Button type="submit" disabled={isPending} className="w-[75%] mx-auto">
                {isPending ? (
                  <>
                    <Spinner />
                    {'Checking credentials...'}
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </Form>
        <CardFooter className="flex text-sm flex-row justify-center p-0 pt-2 m-0 gap-1">
          Have an account?
          <p
            className={`text-gray-500 underline hover:text-gray-400 cursor-pointer `}
            onClick={() => setUserAction('sign-in')}
          >
            Sign In
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
