import { SessionCard } from '@/components/customs/sessions/SessionCard';
import useFetchUserSessions from '@/hooks/session/useFetchUserSessions';

export const UserSessions = () => {
  const {
    query: { data },
  } = useFetchUserSessions();

  const pastSessions = data?.filter((session) => {
    const trainingDate = new Date(session.bookingDate);
    const currentDate = new Date();

    const normalizedTrainingDate = new Date(
      trainingDate.getFullYear(),
      trainingDate.getMonth(),
      trainingDate.getDate()
    );
    const normalizedCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    return normalizedTrainingDate < normalizedCurrentDate;
  });
  const todaySessions = data?.filter((session) => {
    const trainingDate = new Date(session.bookingDate);
    const currentDate = new Date();
    return (
      trainingDate.getDate() === currentDate.getDate() &&
      trainingDate.getMonth() === currentDate.getMonth() &&
      trainingDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const tomorrowSessions = data?.filter((session) => {
    const trainingDate = new Date(session.bookingDate);
    const currentDate = new Date();

    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    return (
      trainingDate.getDate() === tomorrowDate.getDate() &&
      trainingDate.getMonth() === tomorrowDate.getMonth() &&
      trainingDate.getFullYear() === tomorrowDate.getFullYear()
    );
  });

  const futureSessions = data?.filter((session) => {
    const trainingDate = new Date(session.bookingDate);
    const currentDate = new Date();

    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const normalizedTrainingDate = new Date(
      trainingDate.getFullYear(),
      trainingDate.getMonth(),
      trainingDate.getDate()
    );
    const normalizedTomorrowDate = new Date(
      tomorrowDate.getFullYear(),
      tomorrowDate.getMonth(),
      tomorrowDate.getDate()
    );

    return normalizedTrainingDate > normalizedTomorrowDate;
  });

  console.log(todaySessions);
  return (
    <section id="sessions">
      <h1 className="text-4xl font-semibold">Training Sessions</h1>
      {todaySessions !== undefined && todaySessions.length > 0 && (
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-center font-semibold text-2xl border-b border-gray-400">TODAY</h2>
          <div className="flex gap-6 flex-wrap justify-center md:justify-start">
            {todaySessions?.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                className="border-blue-500 bg-blue-100"
                allowButtons={true}
              />
            ))}
          </div>
        </div>
      )}

      {tomorrowSessions !== undefined && tomorrowSessions.length > 0 && (
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-center font-semibold text-2xl border-b border-gray-400">TOMORROW</h2>
          <div className="flex gap-6 flex-wrap justify-center md:justify-start">
            {tomorrowSessions?.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                className="border-yellow-500 bg-yellow-50"
                allowButtons={true}
              />
            ))}
          </div>
        </div>
      )}

      {futureSessions !== undefined && futureSessions.length > 0 && (
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-center font-semibold text-2xl border-b border-gray-400">
            UPCOMING SESSIONS
          </h2>
          <div className="flex gap-6 flex-wrap justify-center md:justify-start">
            {futureSessions?.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                className="border-green-500 bg-green-50"
                allowButtons={true}
              />
            ))}
          </div>
        </div>
      )}

      {pastSessions !== undefined && pastSessions.length > 0 && (
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-center font-semibold text-2xl border-b border-gray-400">
            PAST SESSIONS
          </h2>
          <div className="flex gap-6 flex-wrap justify-center md:justify-start">
            {pastSessions?.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                className="border-gray-500 bg-gray-300 text-gray-500 cursor-default hover:shadow-none"
                allowButtons={false}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
