import { HStack, VStack } from 'shared/ui/Stack';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { FC } from 'react';
import { IWalletCoin } from 'entities/Wallet/model/types';
import styles from './WalletItem.module.scss';

interface IWalletItemProps {
  walletData: IWalletCoin;
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
            text={walletData.currency}
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
