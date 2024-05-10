import { useSelector } from 'react-redux';
import styles from './DashboardPage.module.scss';
import { Page } from '@/widgets/Page/Page';
import { useGetTopCoinsQuery } from '@/entities/Coin/model/api/api';
import { getArticlesPageType } from '@/pages/DashboardPage/model/selectors/dashboardPageSelectors';
import { CoinsBuyList } from '@/entities/Coin/ui/CoinsBuyList/CoinsBuyList';
import { LeaderBoardList } from '@/features/LeaderBoard';
import { NotificationList } from '@/widgets/NotificationList';
import useWindowDimensions from '@/shared/lib/hooks/useWindowDimensions';
import { Mods, classNames } from '@/helpers/classNames/classNames';
import { DasboardReferal } from '@/widgets/DasboardReferal';
import { QuickActions } from '@/widgets/QuickActions';
import { Wallet } from '@/entities/Wallet';

const DashboardPage = () => {
  const type = useSelector(getArticlesPageType);
  const timePeriod = '7d';
  const orderBy = 'change';
  const orderDirection = 'asc';
  const { XXXLLayout, XXLLayout, XLLayout } = useWindowDimensions();

  const { data: coins } = useGetTopCoinsQuery({
    limit: 10,
    tags: [type],
    orderBy,
    orderDirection,
    timePeriod,
  });

  const mods: Mods = {
    [styles.DashboardPageLg]: !!XXXLLayout,
    [styles.DashboardPageXXL]: !!XXLLayout,
    [styles.DashboardPageXL]: !!XLLayout,
  };

  return (
    <Page pageTitle='Dashboard'>
      <div className={classNames(styles.DashboardPage, mods, [])}>
        <Wallet />
        <CoinsBuyList coins={coins} className={styles.CoinsBuyList} />
        <LeaderBoardList />
        <QuickActions />
        <DasboardReferal />
        <NotificationList />
      </div>
      {/* <TopCoinsFilters type={type} />
      <TopCoinsList coins={conins} /> */}
    </Page>
  );
};

export default DashboardPage;
