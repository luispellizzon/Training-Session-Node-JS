import { Button } from '@/components/ui/button';
import useFetchUserSessions from '@/hooks/session/useFetchUserSessions';

export const UserSessions = () => {
  const {
    query: { data },
  } = useFetchUserSessions();
  return (
    <section id="sessions">
      <h1 className="text-4xl font-semibold">Training Sessions</h1>
      <div className="flex flex-col gap-4 p-4">
        {data?.map((session) => (
          <div className="bg-white rounded-md p-4 shadow-sm hover:shadow-lg hover:cursor-pointer max-w-md">
            <h2 className="font-bold text-xl">
              {new Date(session.bookingDate).toLocaleDateString()}
            </h2>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <p className="text-md font-semibold">Facilities:</p>
                {session.facilities.map((place) => (
                  <p>{place}</p>
                ))}
              </div>
              <Button
                variant={'default'}
                className="bg-blue-500 hover:bg-blue-700"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
