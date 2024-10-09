import { Outlet } from 'react-router';
import { BackOnLastPage } from './BackOnLastPage';
import { useQueryClient } from '@tanstack/react-query';
import { AuthModel } from '@/schemas/types/AuthModel';
import Dashboard from '@/pages/dashboard/Dashboard';

export const UserRoute = () => {
  const user = useQueryClient().getQueryData<AuthModel>(['auth']);

  if (user?.role === 'user') {
    return (
      <Dashboard role={user.role}>
        <Outlet />
      </Dashboard>
    );
  }
  return <BackOnLastPage />;
};

export default UserRoute;
