import { classNames } from 'helpers/classNames/classNames';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { useGetTransactionsListQuery } from 'entities/Transaction/model/api/api';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/user';
import styles from './TransationHistory.module.scss';

export const TransationHistory = () => {
  const user = useSelector(getUserAuthData);
  const { data: transactionsList } = useGetTransactionsListQuery({
    userId: String(user?.id),
  });

  if (!transactionsList || !transactionsList.length) {
    return <div>No data</div>;
  }

  return (
    <ContentWrapper
      title='Transation History'
      className={classNames(styles.TransationHistory, {}, [])}
    >
      {transactionsList.map((el) => el.id)}
    </ContentWrapper>
  );
};
