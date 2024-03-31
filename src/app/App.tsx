import { Suspense, useEffect } from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch } from 'react-redux';
import { authActions } from 'entities/user/model/slice';
import { AppRouter } from './providers/router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.initAuthData());
  }, [dispatch]);

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
