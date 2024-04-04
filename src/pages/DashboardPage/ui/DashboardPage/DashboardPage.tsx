import { Page } from 'widgets/Page/Page';
import { useGetTopCoinsQuery } from 'entities/Coin/model/api/api';
import { useSelector } from 'react-redux';
import { getArticlesPageType } from 'pages/DashboardPage/model/selectors/dashboardPageSelectors';
import { TopCoinsFilters } from '../TopCoinsFilters/TopCoinsFilters';
import { TopCoinsList } from '../../../../entities/Coin/ui/TopCoinsList/TopCoinsList';

const DashboardPage = () => {
  const type = useSelector(getArticlesPageType);

  const { data: conins } = useGetTopCoinsQuery({ limit: 10, tags: [type] });

  return (
    <Page>
      <TopCoinsFilters type={type} />
      <TopCoinsList coins={conins} />
    </Page>
  );
};

export default DashboardPage;
