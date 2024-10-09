import Header from '@/components/customs/header/Header';
import DashboardNavigation from '@/components/customs/menus/side-menu/DashboardNavigation';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type DashboardProps = {
  children?: ReactNode;
  role: 'admin' | 'user';
};

const Dashboard = ({ children, role }: DashboardProps) => {
  const { pathname } = useLocation();
  const appLocation = pathname.split('/')[1];

  return (
    <div className="flex overflow-hidden">
      <DashboardNavigation type={role} />
      <div className="w-full h-[100vh]">
        <Header />
        <main
          id={appLocation && appLocation}
          className={
            'bg-slate-200 py-6 sm:py-14  px-4 sm:px-6 dashboard-page-render overflow-y-auto'
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
