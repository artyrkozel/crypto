import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './Wallet.module.scss';
import Mask from '../../../../assets/wallet-mask.png';
import { TextSize, Text } from '@/shared/ui/Text';
import { Logo } from '@/shared/ui/Logo';
import { classNames } from '@/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { getUserAuthData } from '@/entities/user';
import { useGetWalletByUserIdQuery } from '@/entities/Wallet/api/api';

interface IWalletProps {
  className?: string;
}

export const WalletBalance: FC<IWalletProps> = ({ className }) => {
  const user = useSelector(getUserAuthData);

  const { data: wallet } = useGetWalletByUserIdQuery(user?.id);

  if (!wallet) {
    return <div>No wallet data</div>;
  }

  return (
    <div className={classNames(styles.Wallet, {}, [className])}>
      <img className={styles.mask} src={Mask} alt='bg-mask' />
      <div className={styles.balance_wr}>
        <VStack className={styles.balance} gap='8'>
          <Text text='Total Assets' size={TextSize.XS} />
          <Text text={String(wallet.totalValue)} size={TextSize.L} />
        </VStack>
        <div>
          <Logo collapsed={false} />
        </div>
      </div>
    </div>
  );
};
