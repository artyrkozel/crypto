import { CardTheme } from 'shared/ui/Card/ui/Card';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { IoWalletOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import styles from './QuickActions.module.scss';
import { QuickActionsItem } from '../QuickActionsItem/QuickActionsItem';

export interface IQuickAction {
  to: string;
  title: string;
  icon: IconType;
}

export const QuickActions = () => {
  const quickActions: IQuickAction[] = [
    {
      to: '/',
      icon: IoWalletOutline,
      title: 'Deposit',
    },
    {
      to: '/',
      icon: IoWalletOutline,
      title: 'Buy Crypto',
    },
    {
      to: '/',
      icon: IoWalletOutline,
      title: 'Witdraw',
    },
    {
      to: '/',
      icon: IoWalletOutline,
      title: 'Exchange',
    },
    {
      to: '/',
      icon: IoWalletOutline,
      title: 'Stalking',
    },
    {
      to: '/',
      icon: IoWalletOutline,
      title: 'NFT',
    },
  ];

  return (
    <ContentWrapper
      title='Quick Actions'
      theme={CardTheme.NORMAL}
      overflow
      fill
    >
      <div className={styles.QuickActions}>
        {quickActions.map((action) => (
          <QuickActionsItem action={action} />
        ))}
      </div>
    </ContentWrapper>
  );
};
