import OverviewPage from 'pages/OverviewPage/OverviewPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { RouteProps } from 'react-router-dom';
import WalletsPage from 'pages/WalletsPage/WalletsPage';

export enum AppRoutes {
	OVERVIEW = 'overview',
	LOGIN = 'login',
	WALLETS = 'walets',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.OVERVIEW]: '/overview',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.WALLETS]: '/wallets'
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
};
