import { useGetNotificationsByUserIdQuery } from 'entities/Notification/model/api/api';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/user';
import { skipToken } from '@reduxjs/toolkit/query';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { CardTheme } from 'shared/ui/Card/ui/Card';
import { VStack } from 'shared/ui/Stack';
import { useInView } from 'react-intersection-observer';
import { Mods, classNames } from 'helpers/classNames/classNames';
import { useMemo } from 'react';
import styles from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

export const NotificationList = () => {
  const user = useSelector(getUserAuthData);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data: notifList } = useGetNotificationsByUserIdQuery({
    userId: user ? String(user.id) : skipToken,
  });

  const test = useMemo(() => {
    const mods: Mods = {
      [styles.test]: !!inView,
      [styles.bg_view]: !inView,
    };
    return mods;
  }, [inView]);

  if (!notifList || !notifList.length) {
    return <div>No data</div>;
  }

  return (
    <ContentWrapper
      title='Notifications'
      theme={CardTheme.NORMAL}
      overflow
      className={classNames(styles.wrapper, test, [styles.test])}
    >
      <VStack gap='8'>
        {notifList.map((el) => (
          <NotificationItem notification={el} />
        ))}
        <div ref={ref} />
      </VStack>
    </ContentWrapper>
  );
};
