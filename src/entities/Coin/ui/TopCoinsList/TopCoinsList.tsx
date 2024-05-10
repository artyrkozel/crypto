import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import styles from './TopCoinsList.module.scss';
import { TopCoinListItem } from '../TopCoinsListItem/TopCoinsListItem';
import { classNames } from '@/helpers/classNames/classNames';
import { ICoin } from '@/entities/Coin/model/types/coin';
import { TextSize, Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { ContentWrapper } from '@/widgets/ContentWrapper';
import { CardTheme } from '@/shared/ui/Card/ui/Card';

interface TopCoinsListProps {
  className?: string;
  coins: ICoin[] | undefined;
  target?: HTMLAttributeAnchorTarget;
}

export const TopCoinsList = memo((props: TopCoinsListProps) => {
  const { className, coins, target } = props;

  const { t } = useTranslation();

  if (!coins || !coins.length) {
    return (
      <div className={classNames(styles.CoinsList, {}, [className || ''])}>
        <Text size={TextSize.L} title={t('No result')} />
      </div>
    );
  }

  return (
    <ContentWrapper
      title='Top Cryptocurrencies'
      className={classNames(styles.TradeList, {}, [])}
      theme={CardTheme.NORMAL}
    >
      <VStack
        className={classNames(styles.CoinsList, {}, [className || ''])}
        data-testid='TopCoinsList'
      >
        {coins.map((item) => (
          <TopCoinListItem
            coin={item}
            target={target}
            key={item.name}
            className={styles.card}
          />
        ))}
      </VStack>
    </ContentWrapper>
  );
});
