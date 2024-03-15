import { useMutation, useQuery } from 'react-query';
import { test, testMutate } from '../api/test/test';
import { AppRouter } from './providers/router';

function App() {
  const { data: authors } = useQuery(['auth'], test);
  const { mutateAsync } = useMutation(testMutate);

  const mut = async () => {
    const res = await mutateAsync({ test: 'test' });
    console.log(res);
  };

  console.log(authors);
  return (
    <>
      <AppRouter />
      <button onClick={mut}>click</button>
    </>
  );
}

export default App;
