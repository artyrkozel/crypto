import { FC, useCallback } from 'react';
import styles from './TopCoinsFilters.module.scss';
import { classNames } from '@/helpers/classNames/classNames';
import { TopCoinsFiltersTabs } from '@/features/TopCoinsFiltersTabs';
import { CoinFilterType } from '@/entities/Coin/model/consts/coinConsts';
import { useAppDispatch } from '@/shared/lib/hooks/redux-hooks';
import { dashboardPageActions } from '@/pages/DashboardPage/model/slice/dashboardPageSlice';

interface TopCoinsFiltersProps {
  className?: string;
  type: CoinFilterType;
}

export const TopCoinsFilters: FC<TopCoinsFiltersProps> = ({ className, type }) => {
  const dispatch = useAppDispatch();

  const onChangeType = useCallback(
    (value: CoinFilterType) => {
      dispatch(dashboardPageActions.setType(value));
    },
    [dispatch],
  );

  return (
    <div className={classNames(styles.TopCoinsFilters, {}, [className || ''])}>
      <TopCoinsFiltersTabs value={type} onChangeType={onChangeType} />
    </div>
  );
};
