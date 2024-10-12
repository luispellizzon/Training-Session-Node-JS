import { useReconnect } from '@/hooks/reconnect/useReconnect';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { data: user } = useReconnect();
  let location = useLocation().pathname.split('/')[2];
  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role === 'admin') {
    if (location === 'admin') {
      return <Outlet />;
    }
    return <Navigate to="/auth/admin/users" replace />;
  }

  if (user.role === 'user') {
    if (location === 'user') {
      return <Outlet />;
    }
    return <Navigate to="/auth/user/sessions" replace />;
  }

  return <Outlet />;
};
