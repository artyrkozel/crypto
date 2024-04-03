import { Card } from 'shared/ui/Card';
import { Page } from 'widgets/Page/Page';
import { iconsMap } from 'shared/lib/icons';
import { Icon } from 'shared/ui/Icon';
import { useGetTopCoinsQuery } from 'entities/Coin/model/api/api';
import { TopCoinsFilters } from '../TopCoinsFilters/TopCoinsFilters';
import { TopCoinsList } from '../../../../entities/Coin/ui/TopCoinsList/TopCoinsList';

const filter = {
  limit: 10,
};

const DashboardPage = () => {
  const { data: conins } = useGetTopCoinsQuery(filter);

  return (
    <Page>
      <Card>
        <Icon Svg={iconsMap.Binance} width={55} height={55} />
      </Card>
      <TopCoinsFilters />
      <TopCoinsList coins={conins} />
    </Page>
  );
};

export default DashboardPage;
