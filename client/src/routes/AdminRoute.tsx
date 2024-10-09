import { Outlet } from 'react-router';
import { BackOnLastPage } from './BackOnLastPage';
import { useQueryClient } from '@tanstack/react-query';
import { AuthModel } from '@/schemas/types/AuthModel';
import Dashboard from '@/pages/dashboard/Dashboard';

export const AdminRoute = () => {
  const user = useQueryClient().getQueryData<AuthModel>(['auth']);
  return (
    <>
      {user?.role === 'admin' ? (
        <Dashboard role={user?.role}>
          <Outlet />
        </Dashboard>
      ) : (
        <BackOnLastPage />
      )}
    </>
  );
};

export default AdminRoute;
