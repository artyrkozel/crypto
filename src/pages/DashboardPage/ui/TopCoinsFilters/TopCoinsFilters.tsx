import { FC, useCallback, useState } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { TopCoinsFiltersTabs } from 'features/TopCoinsFiltersTabs';
import { CoinFilterType } from 'entities/Coin/model/consts/coinConsts';
import { useAppDispatch } from 'shared/lib/hooks/redux-hooks';
import { dashboardPageActions } from 'pages/DashboardPage/model/slice/dashboardPageSlice';
import styles from './TopCoinsFilters.module.scss';

interface TopCoinsFiltersProps {
  className?: string;
}

export const TopCoinsFilters: FC<TopCoinsFiltersProps> = ({ className }) => {
  const [type, setType] = useState<CoinFilterType>(CoinFilterType.POPULAR);
  const dispatch = useAppDispatch();

  const onChangeType = useCallback((value: CoinFilterType) => {
    dispatch(dashboardPageActions.setType(value));
    setType(value);
  }, [dispatch]);

  return (
    <div
      className={classNames(styles.ArticlesPageFilters, {}, [className || ''])}
    >
      <TopCoinsFiltersTabs value={type} onChangeType={onChangeType} />
    </div>
  );
};
