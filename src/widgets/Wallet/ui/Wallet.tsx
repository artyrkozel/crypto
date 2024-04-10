import { FC } from 'react';
import { TextSize, Text } from 'shared/ui/Text';
import { Logo } from 'shared/ui/Logo';
import { classNames } from 'helpers/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import styles from './Wallet.module.scss';
import Mask from '../../../assets/wallet-mask.png';

interface IWalletProps {
  className?: string;
}

export const Wallet: FC<IWalletProps> = ({ className }) => {
  return (
    <div className={classNames(styles.Wallet, {}, [className || ''])}>
      <img className={styles.mask} src={Mask} alt='bg-mask' />
      <div className={styles.balance_wr}>
        <VStack className={styles.balance} gap='8'>
          <Text text='Total Assets' size={TextSize.XS} />
          <Text text='2,460.89' size={TextSize.L} />
        </VStack>
        <div>
          <Logo collapsed={false} />
        </div>
      </div>
    </div>
  );
};
