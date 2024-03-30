import { useAppSelector } from 'shared/lib/hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { getCookies } from 'shared/lib/utils';
import { useGetUserByIdQuery } from 'entities/user/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { SelectCurrentUserId } from 'entities/user/model/selectors/SelectCurrentUserId/SelectCurrentUserId';
import { AppRouter } from './providers/router';

function App() {
  const id = useAppSelector(SelectCurrentUserId) || localStorage.getItem('UserId');
  const navigate = useNavigate();

  const accessToken = getCookies('accessToken');

  if (!accessToken) navigate('/login');

  const { data: user } = useGetUserByIdQuery(
    accessToken && id ? id : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (user) {
      user?.id && localStorage.setItem('UserId', JSON.stringify(user.id));
      navigate(AppRoutes.OVERVIEW, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className='app'>
      <Suspense fallback=''>
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
