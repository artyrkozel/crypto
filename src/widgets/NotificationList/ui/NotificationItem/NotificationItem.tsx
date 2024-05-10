import { FC } from 'react';
import styles from './NotificationItem.module.scss';
import { INotificationCreate } from '@/entities/Notification/model/types';
import { TextSize, Text, TextColor } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { NotificationIcon } from '@/shared/ui/NotificationIcon';
import { classNames } from '@/helpers/classNames/classNames';
import { dateToString } from '@/shared/lib/date';
import { generateDepositTest } from '@/shared/lib/utils';

interface INotificationItemProps {
  notification: INotificationCreate;
}

const paymentTypeTitleMap: Record<string, string> = {
  withdraw: 'Withdraw Successful',
  deposit: 'Deposit Successful',
};

export const NotificationItem: FC<INotificationItemProps> = ({
  notification,
}) => {
  const { type, summ, currency, date } = notification;

  return (
    <div className={classNames(styles.NotificationItem)}>
      <VStack gap='8' className={styles.title}>
        <HStack gap='8'>
          <NotificationIcon />
          <Text size={TextSize.XS} title={paymentTypeTitleMap[type]} />
        </HStack>
        <div>{dateToString(date)}</div>
      </VStack>

      <Text
        className={styles.message}
        color={TextColor.grey}
        size={TextSize.XS}
        text={generateDepositTest('deposit', summ, currency)}
      />
      <div />
    </div>
  );
};
