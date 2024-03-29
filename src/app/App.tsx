import { useAppSelector } from 'shared/lib/hooks/redux-hooks';
import { selectIsAuthenticated } from 'entities/user/model/selectors/SelectIsAuthenticated/selectIsAuthenticated';
import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { AppRouter } from './providers/router';

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoutes.OVERVIEW, { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="app">
      <Suspense fallback="">
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
