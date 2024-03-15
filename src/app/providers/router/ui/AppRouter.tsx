import { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					{Object.values(routeConfig).map(({ element, path }) => (
						<Route key={path} path={path} element={element} />
					))}
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default AppRouter;
