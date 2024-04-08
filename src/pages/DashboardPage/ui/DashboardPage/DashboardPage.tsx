import { Page } from 'widgets/Page/Page';
import { useGetTopCoinsQuery } from 'entities/Coin/model/api/api';
import { useSelector } from 'react-redux';
import { getArticlesPageType } from 'pages/DashboardPage/model/selectors/dashboardPageSelectors';
import { CoinsBuyList } from 'entities/Coin/ui/CoinsBuyList/CoinsBuyList';
import { LeaderBoardList } from 'features/LeaderBoard';
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
      <div className={styles.DashboardPage}>
        <div style={{ border: '1px solid #e1e1e1' }}>11111111</div>
        <CoinsBuyList coins={conins} className={styles.CoinsBuyList} />
        <LeaderBoardList />
        <div style={{ border: '1px solid #e1e1e1' }}>33333333</div>
        <div style={{ border: '1px solid #e1e1e1' }}>4444444444</div>
        <div style={{ border: '1px solid #e1e1e1' }}>555555555</div>
      </div>
      {/* <TopCoinsFilters type={type} />
      <TopCoinsList coins={conins} /> */}
    </Page>
  );
};

export default DashboardPage;
