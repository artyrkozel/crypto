import { FC, memo, useCallback, useMemo } from 'react';
import { CoinFilterType } from 'entities/Coin/model/consts/coinConsts';
import { TabItem, Tabs } from 'shared/ui/Tabs/ui/Tabs';
import { useTranslation } from 'react-i18next';
import { classNames } from 'helpers/classNames/classNames';

interface TopCoinsTabsProps {
  className?: string;
  value: CoinFilterType;
  onChangeType: (type: CoinFilterType) => void;
}

export const TopCoinsFiltersTabs: FC<TopCoinsTabsProps> = memo(
  ({ className, onChangeType, value }) => {
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
      () => [
        {
          value: CoinFilterType.POPULAR,
          content: t('Popular'),
        },
        {
          value: CoinFilterType.TOP_VALUE,
          content: t('Top value'),
        },
      ],
      [t],
    );

    const onTabClick = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as CoinFilterType);
      },
      [onChangeType],
    );

    return (
      <Tabs
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={classNames('', {}, [className || ''])}
      />
    );
  },
);
