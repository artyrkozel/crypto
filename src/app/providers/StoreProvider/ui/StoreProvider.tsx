import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
  children?: ReactNode;
  initialStore?: StateSchema;
}

export const StoreProvider = ({
  children,
  initialStore,
}: StoreProviderProps) => {
  const store = createReduxStore(initialStore);

  return <Provider store={store}>{children}</Provider>;
};
