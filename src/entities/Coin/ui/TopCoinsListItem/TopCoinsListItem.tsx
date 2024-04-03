import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text, TextColor } from 'shared/ui/Text';
import { classNames } from 'helpers/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ICoin } from 'entities/Coin/model/types/coin';
import styles from './TopCoinsListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  coin: ICoin;
  target?: HTMLAttributeAnchorTarget;
}

export const TopCoinListItem = memo((props: ArticleListItemProps) => {
  const { className, coin, target } = props;

  return (
    <AppLink
      data-testid='ArticleListItem'
      target={target}
      to=""
      className={classNames('', {}, [className || ''])}
    >
      <Card className={styles.coinItem}>
        <div>
          <Text text={String(coin.btcPrice)} color={TextColor.secondary} />
        </div>
        <Text text={coin.name} color={TextColor.secondary} />
      </Card>
    </AppLink>
  );
});
