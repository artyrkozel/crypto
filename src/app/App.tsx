import { useAppSelector } from 'shared/lib/hooks/redux-hooks';
import { AppRouter } from './providers/router';
import { selectIsAuthenticated } from 'entities/user/model/selectors/SelectIsAuthenticated/selectIsAuthenticated';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/', { replace: true });
		}
	}, [navigate, isAuthenticated]);

	return (
		<>
			<AppRouter />
		</>
	);
}

export default App;
