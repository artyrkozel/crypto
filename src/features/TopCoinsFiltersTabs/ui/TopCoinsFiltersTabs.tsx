import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CoinFilterType } from '@/entities/Coin/model/consts/coinConsts';
import { TabItem, Tabs } from '@/shared/ui/Tabs/ui/Tabs';
import { classNames } from '@/helpers/classNames/classNames';

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
          value: CoinFilterType.STABLECOIN,
          content: t('Stablecoin'),
        },
        {
          value: CoinFilterType.NFT,
          content: t('NFT'),
        },
        {
          value: CoinFilterType.PRIVACY,
          content: t('Privacy'),
        },
        {
          value: CoinFilterType.WEB_3,
          content: t('WEB3'),
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
        className={classNames('', {}, [className])}
      />
    );
  },
);
