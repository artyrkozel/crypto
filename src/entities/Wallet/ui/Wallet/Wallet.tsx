import { CardTheme } from 'shared/ui/Card/ui/Card';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { FC } from 'react';
import styles from './Wallet.module.scss';
import { WalletBalance } from '../WalletBalance/WalletBalance';
import { WalletList } from '../WalletList/WalletList';

interface IWallet {
  className?: string;
}

export const Wallet: FC<IWallet> = () => {
  return (
    <ContentWrapper
      title='Wallet Cryptocurrency'
      theme={CardTheme.NORMAL}
      className={styles.Wallet}
    >
      <WalletBalance className={styles.wallet_balance} />
      <WalletList className={styles.wallet_list} />
    </ContentWrapper>
  );
};
