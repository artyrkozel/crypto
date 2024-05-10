import { useGetNotificationsByUserIdQuery } from '@/entities/Notification/model/api/api';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/user';
import { skipToken } from '@reduxjs/toolkit/query';
import { ContentWrapper } from '@/widgets/ContentWrapper';
import { CardTheme } from '@/shared/ui/Card/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Mods, classNames } from '@/helpers/classNames/classNames';
import { RefObject, useRef } from 'react';
import useInViewPort from '@/shared/lib/hooks/useInViewPort';
import styles from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

export const NotificationList = () => {
  const user = useSelector(getUserAuthData);
  const ref = useRef() as RefObject<HTMLDivElement>;

  const { inViewport } = useInViewPort(ref, { threshold: 0.5 });
  const { data: notifList } = useGetNotificationsByUserIdQuery({
    userId: user ? String(user.id) : skipToken,
  });

  const mods: Mods = {
    [styles.bg_view]: !inViewport,
  };

  if (!notifList || !notifList.length) {
    return <div>No data</div>;
  }

  return (
    <ContentWrapper
      title='Notifications'
      theme={CardTheme.NORMAL}
      overflow
      className={classNames(styles.wrapper, mods, [])}
    >
      <VStack gap='8'>
        {notifList.map((el) => (
          <NotificationItem key={el.summ} notification={el} />
        ))}
        <div ref={ref} />
      </VStack>
    </ContentWrapper>
  );
};
