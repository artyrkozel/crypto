import { FC } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { Text, TextAlign, TextColor } from 'shared/ui/Text';
import { IWalletCoin } from 'entities/Wallet/model/types';
import styles from './WalletList.module.scss';
import { WalletItem } from '../WalletItem/WalletItem';

// const data = [
//   {
//     id: 1,
//     currency: 'Bitcoin',
//     iconUrl: 'https://cdn.coinranking.com/s5cHqxxYr/gusd.svg',
//     value: 143,
//     symbol: 'GUSD',
//   },
//   {
//     id: 1,
//     currency: 'Bitcoin',
//     iconUrl: 'https://cdn.coinranking.com/s5cHqxxYr/gusd.svg',
//     value: 143,
//     symbol: 'GUSD',
//   },
// ];

interface IWalletListProps {
  walletCoins: Array<IWalletCoin>;
}

export const WalletList: FC<IWalletListProps> = ({ walletCoins }) => {
  if (!walletCoins.length) {
    return <Text text='No data' color={TextColor.secondary} align={TextAlign.CENTER} />;
  }

  return (
    <div className={classNames(styles.WalletList, {}, [])}>
      {walletCoins.map((el) => (
        <WalletItem walletData={el} />
      ))}
    </div>
  );
};
