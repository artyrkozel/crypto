import styles from './TradePage.module.scss';
import { TradePageCoins } from '../TradePageCoinsFilters/TradePageCoins';
import { TradeList } from '../TradeList';
import { TransationHistory } from '../TransationHistory/TransationHistory';
import { Page } from '@/widgets/Page/Page';
import { classNames } from '@/helpers/classNames/classNames';
import { Wallet } from '@/entities/Wallet';
import { TopCoinsList } from '@/entities/Coin/ui/TopCoinsList/TopCoinsList';
import { useGetTopCoinsQuery } from '@/entities/Coin/model/api/api';

const TradePage = () => {
  const orderBy = 'change';
  const orderDirection = 'desc';
  const timePeriod = '30d';

  const { data: coins } = useGetTopCoinsQuery({
    limit: 10,
    tags: [],
    orderBy,
    orderDirection,
    timePeriod,
  });

  return (
    <Page pageTitle='Trade'>
      <div className={classNames(styles.TradePage)}>
        <TradePageCoins />
        <TradeList />
        <TopCoinsList coins={coins} />
        <TransationHistory />
        <Wallet />
      </div>
    </Page>
  );
};

export default TradePage;
