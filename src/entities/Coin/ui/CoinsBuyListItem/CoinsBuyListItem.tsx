import { ICoin } from 'entities/Coin/model/types/coin';
import { FC } from 'react';
import { Card } from 'shared/ui/Card';
import { Text, TextColor } from 'shared/ui/Text';
import { HStack } from 'shared/ui/Stack';
import { numMask, round } from 'shared/lib/numbers';
import { ChangePrice } from 'widgets/ChangePrice';
import { classNames } from 'helpers/classNames/classNames';
import styles from './CoinsBuyListItem.module.scss';

interface ICoinsByListItemProps {
  className?: string;
  coin: ICoin;
}

export const CoinsBuyListItem: FC<ICoinsByListItemProps> = ({
  coin,
  className,
}) => {
  return (
    <Card className={classNames(styles.coinsByListItem, {}, [className || ''])}>
      <HStack gap='8' justify='between'>
        <HStack>
          <div>
            <img
              src={coin.iconUrl}
              alt={coin.name}
              style={{ width: 40, height: 40 }}
            />
          </div>
          <div>
            <Text text={coin.name} color={TextColor.secondary} />
            <Text
              className={styles.symbol}
              text={coin.symbol}
              color={TextColor.secondary}
            />
          </div>
        </HStack>
        <HStack>
          <Text
            text={`$ ${String(numMask(round(+coin.price)))}`}
            color={TextColor.secondary}
          />
          <ChangePrice
            changeValue={+coin.change}
            className={styles.changePrice}
          />
        </HStack>
      </HStack>
    </Card>
  );
};
