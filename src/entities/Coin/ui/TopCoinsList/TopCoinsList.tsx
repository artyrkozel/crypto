import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { ICoin } from 'entities/Coin/model/types/coin';
import { TextSize, Text } from 'shared/ui/Text';
import styles from './TopCoinsList.module.scss';
import { TopCoinListItem } from '../TopCoinsListItem/TopCoinsListItem';

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
    <div
      className={classNames(styles.CoinsList, {}, [className || ''])}
      data-testid='ArticleList'
    >
      {coins.map((item) => (
        <TopCoinListItem
          coin={item}
          target={target}
          key={item.name}
          className={styles.card}
        />
      ))}
    </div>
  );
});
