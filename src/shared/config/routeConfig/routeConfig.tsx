import HomePage from 'pages/HomePage/HomePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
	HOME = 'home',
	LOGIN = 'login',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.LOGIN]: '/login',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.HOME]: {
		path: RoutePath.home,
		element: <HomePage />,
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath.login,
		element: <LoginPage />,
	},
};
