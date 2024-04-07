import { Page } from 'widgets/Page/Page';
import { useGetTopCoinsQuery } from 'entities/Coin/model/api/api';
import { useSelector } from 'react-redux';
import { getArticlesPageType } from 'pages/DashboardPage/model/selectors/dashboardPageSelectors';
import { CoinsBuyList } from 'entities/Coin/ui/CoinsBuyList/CoinsBuyList';
import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
  const type = useSelector(getArticlesPageType);
  // const sort = useSelector(getSortType);
  // console.log('sort', sort);
  const orderBy = 'change';
  const orderDirection = 'asc';

  const { data: conins } = useGetTopCoinsQuery({
    limit: 10,
    tags: [type],
    orderBy,
    orderDirection,
  });

  return (
    <Page>
      {/* <TopCoinsFilters type={type} />
      <TopCoinsList coins={conins} /> */}
      <CoinsBuyList coins={conins} className={styles.CoinsBuyList} />
    </Page>
  );
};

export default DashboardPage;
