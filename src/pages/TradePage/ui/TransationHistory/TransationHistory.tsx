import { Mods, classNames } from 'helpers/classNames/classNames';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { useGetTransactionsListQuery } from 'entities/Transaction/model/api/api';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/user';
import { TransationItem } from 'entities/Transaction/ui/TransationItem/TransationItem';
import useInViewPort from 'shared/lib/hooks/useInViewPort';
import { RefObject, useRef } from 'react';
import { VStack } from 'shared/ui/Stack';
import { CardTheme } from 'shared/ui/Card/ui/Card';
import styles from './TransationHistory.module.scss';

export const TransationHistory = () => {
  const user = useSelector(getUserAuthData);
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { inViewport } = useInViewPort(ref, { threshold: 0.5 });

  const { data: transactionsList } = useGetTransactionsListQuery({
    userId: String(user?.id),
  });

  if (!transactionsList || !transactionsList.length) {
    return <div>No data</div>;
  }

  const mods: Mods = {
    [styles.bg_view]: !inViewport,
  };

  return (
    <ContentWrapper
      title='Transation History'
      overflow
      theme={CardTheme.NORMAL}
      className={classNames(styles.TransationHistory, mods, [])}
    >
      <VStack gap='8' style={{ width: '100%' }}>
        {transactionsList.map((el) => (
          <TransationItem key={el.id} transation={el} />
        ))}
        <div ref={ref} />
      </VStack>
    </ContentWrapper>
  );
};
