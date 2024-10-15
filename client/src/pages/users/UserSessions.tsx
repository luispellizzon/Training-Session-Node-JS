import { SessionCard } from '@/components/customs/sessions/SessionCard';
import useFetchUserSessions from '@/hooks/session/useFetchUserSessions';

export const UserSessions = () => {
  const {
    query: { data },
  } = useFetchUserSessions();
  return (
    <section id="sessions">
      <h1 className="text-4xl font-semibold">Training Sessions</h1>
      <div className="flex flex-col gap-4 p-4">
        {data?.map((session) => <SessionCard key={session._id} session={session} />)}
      </div>
    </section>
  );
};
