import { ITransaction } from 'entities/Transaction/model/types/types';
import { FC } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { dateToString } from 'shared/lib/date';
import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './TransationItem.module.scss';

interface ITransationItem {
  transation: ITransaction;
}

export const TransationItem: FC<ITransationItem> = ({ transation }) => {
  const { coinName, coinSymbol, coinSum, type, usdSum, date } = transation;

  const mods: Mods = {
    [styles[type]]: true,
  };

  return (
    <div className={styles.TransationItem}>
      <Text
        className={styles.date}
        text={dateToString(date)}
        color={TextColor.grey}
        size={TextSize.XS}
      />
      <HStack justify='between'>
        <VStack gap='8'>
          <Text
            text={`${coinName} (${coinSymbol})`}
            color={TextColor.secondary}
            size={TextSize.S}
          />
          <Text
            className={classNames(styles.transationType, mods, [])}
            text={type}
            color={TextColor.secondary}
            size={TextSize.XS}
          />
        </VStack>
        <VStack align='end' gap='8'>
          <Text
            text={`${coinSum}`}
            color={TextColor.secondary}
            size={TextSize.S}
          />
          <Text
            className={styles.usdSum}
            text={`${usdSum} USD`}
            color={TextColor.grey}
            size={TextSize.XS}
          />
        </VStack>
      </HStack>
    </div>
  );
};
