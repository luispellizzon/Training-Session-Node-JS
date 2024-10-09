import { useReconnect } from '@/hooks/reconnect/useReconnect';
import { AuthModel } from '@/schemas/types/AuthModel';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Root() {
  // const { data } = useReconnect();
  const data = useQueryClient().getQueryData<AuthModel>(['auth']);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (data) {
  //     if (data.role === 'admin') {
  //       navigate('/users');
  //     }
  //     if (data.role === 'user') {
  //       navigate('/bookings');
  //     }
  //   }
  // }, [data]);

  return <Outlet />;
}
