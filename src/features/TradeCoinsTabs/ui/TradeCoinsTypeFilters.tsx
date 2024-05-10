import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ETradeTab } from '@/entities/Coin/model/consts/coinConsts';
import { classNames } from '@/helpers/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs/ui/Tabs';

interface ITradeCoinsTabs {
  className?: string;
  onChangeType: (type: ETradeTab) => void;
  value: ETradeTab;
}

export const TradeCoinsTypeFilters: FC<ITradeCoinsTabs> = memo(
  ({ className, onChangeType, value }) => {
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
      () => [
        {
          value: ETradeTab.STABLECOIN,
          content: t('Favorites'),
        },
        {
          value: ETradeTab.WEB_3,
          content: t('Coins'),
        },
        {
          value: ETradeTab.NFT,
          content: t('Trending'),
        },
      ],
      [t],
    );

    const onTabClick = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as ETradeTab);
      },
      [onChangeType],
    );

    return (
      <Tabs
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={classNames('', {}, [className])}
      />
    );
  },
);
