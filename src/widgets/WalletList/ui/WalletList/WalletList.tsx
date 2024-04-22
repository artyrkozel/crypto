import { FC } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { Text, TextAlign, TextColor } from 'shared/ui/Text';
import { getWalletCurrency } from 'entities/Wallet/model/selectors';
import { useSelector } from 'react-redux';
import styles from './WalletList.module.scss';
import { WalletItem } from '../WalletItem/WalletItem';

interface IWalletListProps {}

export const WalletList: FC<IWalletListProps> = () => {
  const walletCoins = useSelector(getWalletCurrency);

  if (!walletCoins.length) {
    return (
      <Text
        text='No data'
        color={TextColor.secondary}
        align={TextAlign.CENTER}
      />
    );
  }

  return (
    <div className={classNames(styles.WalletList, {}, [])}>
      {walletCoins.map((el) => (
        <WalletItem key={el.name} walletData={el} />
      ))}
    </div>
  );
};
