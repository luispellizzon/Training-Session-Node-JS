import { ListIcon, LineChart, UsersIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BookNewTrainingSessionModal } from '../../modals/BookNewTrainingSessionModal';
import { useQueryClient } from '@tanstack/react-query';
import { AuthModel } from '@/schemas/types/AuthModel';

type DashboardNavigationProps = {
  type: 'user' | 'admin';
};
const DashboardNavigation = ({ type }: DashboardNavigationProps) => {
  const user = useQueryClient().getQueryData<AuthModel>(['auth']);
  const { pathname } = useLocation();
  const appLocation: string = pathname.split('/')[3];
  return (
    <>
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        {/* RENDER TYPE OF NAVIGATION FOR EACH TYPE OF USER */}
        <div className="p-6 text-white flex flex-col">
          <p className="text-3xl font-semibold uppercase hover:text-gray-300">
            {user?.username.split(' ')[0]}
          </p>
          <span className="text-sm">ID: {user?._id}</span>
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
