import OverviewPage from 'pages/OverviewPage/OverviewPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import WalletsPage from 'pages/WalletsPage/WalletsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { AppRoutesProps } from 'app/providers/router/ui/AppRouter';

export enum AppRoutes {
  MAIN = '/',
  OVERVIEW = 'overview',
  LOGIN = 'login',
  WALLETS = 'wallets',
  NOT_FOUND_PAGE = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.OVERVIEW]: '/overview',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.WALLETS]: '/wallets',
  [AppRoutes.NOT_FOUND_PAGE]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath['/'],
    element: <div>Main</div>,
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
  [AppRoutes.WALLETS]: {
    path: RoutePath.wallets,
    element: <WalletsPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND_PAGE]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
    authOnly: true,
  },
};
