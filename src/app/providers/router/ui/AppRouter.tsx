import { Suspense, memo, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<div>loadinf</div>}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
                  route.authOnly ? (
                    <RequireAuth>{element}</RequireAuth>
                  ) : (
                    element
                  )
              }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
