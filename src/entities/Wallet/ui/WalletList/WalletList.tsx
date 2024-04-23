import { FC } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { Text, TextAlign, TextColor } from 'shared/ui/Text';
import { getWalletCurrency } from 'entities/Wallet/model/selectors';
import { useSelector } from 'react-redux';
import styles from './WalletList.module.scss';
import { WalletItem } from './ui/WalletItem/WalletItem';

interface IWalletListProps {
  className?: string;
}

export const WalletList: FC<IWalletListProps> = ({ className }) => {
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
    <div className={classNames(styles.WalletList, {}, [className])}>
      {walletCoins.map((el) => (
        <WalletItem key={el.name} walletData={el} />
      ))}
    </div>
  );
};
