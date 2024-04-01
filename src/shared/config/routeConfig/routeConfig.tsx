import OverviewPage from 'pages/OverviewPage/OverviewPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import WalletsPage from 'pages/WalletsPage/WalletsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AppRoutesProps } from 'app/providers/router/ui/AppRouter';

export enum AppRoutes {
  MAIN = '/',
  DASHBOARD = 'dashboard',
  OVERVIEW = 'overview',
  LOGIN = 'login',
  WALLET = 'wallet',
  NOT_FOUND_PAGE = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.OVERVIEW]: '/overview',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.WALLET]: '/wallet',
  [AppRoutes.NOT_FOUND_PAGE]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath['/'],
    element: <div>Main</div>,
    authOnly: true,
  },
  [AppRoutes.DASHBOARD]: {
    path: RoutePath.dashboard,
    element: <div>DASHBOARD</div>,
    authOnly: true,
  },
  [AppRoutes.OVERVIEW]: {
    path: RoutePath.overview,
    element: <OverviewPage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.WALLET]: {
    path: RoutePath.wallet,
    element: <WalletsPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND_PAGE]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
    authOnly: true,
  },
};
