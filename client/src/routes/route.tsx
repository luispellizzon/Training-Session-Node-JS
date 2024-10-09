import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import { Login } from '@/pages/login/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { UserRoute } from './UserRoute';
import Users from './Users';
import { UserSessions } from '@/pages/users/UserSessions';
import { UserReport } from '@/pages/users/UserReport';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
  {
    path: 'auth',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          {
            path: 'users',
            element: <Users />,
          },
        ],
      },
      {
        path: 'user',
        element: <UserRoute />,
        children: [
          {
            path: 'sessions',
            element: <UserSessions />,
          },
          {
            path: 'report',
            element: <UserReport />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <h1>Error page</h1>,
  },
];

const router = createBrowserRouter(routes);

export default router;
