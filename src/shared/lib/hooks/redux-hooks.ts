import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';
import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
