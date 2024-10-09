// import useFetchUserInformation from '@/hooks/user/useFetchUserInformation';
import { ListIcon, LineChart, UsersIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BookNewTrainingSessionModal } from '../../modals/BookNewTrainingSessionModal';

type DashboardNavigationProps = {
  type: 'user' | 'admin';
};
const DashboardNavigation = ({ type }: DashboardNavigationProps) => {
  // const {
  //   query: { data },
  // } = useFetchUserInformation();
  const { pathname } = useLocation();
  const appLocation: string = pathname.split('/')[3];
  console.log(appLocation);
  return (
    <>
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        {/* RENDER TYPE OF NAVIGATION FOR EACH TYPE OF USER */}
        <div className="p-6">
          <p className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
            NAME HERE
          </p>
          <BookNewTrainingSessionModal />
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <ul>
            {type === 'admin' && (
              <Link
                to="users"
                className={`flex items-center text-white py-4 pl-6 nav-item gap-2 ${appLocation === 'users' && 'active-nav-link'}`}
              >
                <UsersIcon size={18} />
                Users
              </Link>
            )}

            {type === 'user' && (
              <>
                <Link
                  to="sessions"
                  className={`flex items-center text-white py-4 pl-6 nav-item gap-2 ${appLocation === 'sessions' && 'active-nav-link'}`}
                >
                  <ListIcon size={18} />
                  My Bookings
                </Link>
                <Link
                  to="report"
                  className={`flex items-center text-white py-4 pl-6 nav-item gap-2 ${appLocation === 'report' && 'active-nav-link'}`}
                >
                  <LineChart size={18} />
                  Report
                </Link>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default DashboardNavigation;
