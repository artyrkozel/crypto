import { FC } from 'react';
import styles from './WalletItem.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { TextSize, Text, TextColor } from '@/shared/ui/Text';
import { IWalletCurrency } from '@/entities/Wallet/model/types';

interface IWalletItemProps {
  walletData: IWalletCurrency;
}

export const WalletItem: FC<IWalletItemProps> = ({ walletData }) => {
  return (
    <div
      className={styles.WalletItem}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <HStack>
        <div>
          <img
            height={40}
            src={walletData.iconUrl}
            alt=''
            style={{ marginRight: 8 }}
          />
        </div>
        <VStack gap='8'>
          <Text
            className={styles.title}
            size={TextSize.S}
            color={TextColor.secondary}
            text={String(walletData.value)}
          />
          <Text
            className={styles.symbol}
            size={TextSize.XS}
            color={TextColor.secondary}
            text={String(walletData.symbol)}
          />
        </VStack>
      </HStack>

      <VStack gap='8' justify='end' align='end'>
        <Text
          className={styles.title}
          size={TextSize.S}
          color={TextColor.secondary}
          text={String(walletData.value)}
        />
        <Text
          className={styles.symbol}
          size={TextSize.XS}
          color={TextColor.secondary}
          text={`${walletData.value} USD`}
        />
      </VStack>
    </div>
  );
};
