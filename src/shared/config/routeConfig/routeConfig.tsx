import OverviewPage from 'pages/OverviewPage/OverviewPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { RouteProps } from 'react-router-dom';
import WalletsPage from 'pages/WalletsPage/WalletsPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export enum AppRoutes {
	OVERVIEW = 'overview',
	LOGIN = 'login',
	WALLETS = 'walets',
	NOT_FOUND_PAGE = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.OVERVIEW]: '/overview',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.WALLETS]: '/wallets',
	[AppRoutes.NOT_FOUND_PAGE]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.OVERVIEW]: {
		path: RoutePath.overview,
		element: <OverviewPage />,
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath.login,
		element: <LoginPage />,
	},
	[AppRoutes.WALLETS]: {
		path: RoutePath.walets,
		element: <WalletsPage />,
	},
	[AppRoutes.NOT_FOUND_PAGE]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
