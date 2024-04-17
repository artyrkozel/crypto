import { Page } from 'widgets/Page/Page';
import { useGetTopCoinsQuery } from 'entities/Coin/model/api/api';
import { useSelector } from 'react-redux';
import { getArticlesPageType } from 'pages/DashboardPage/model/selectors/dashboardPageSelectors';
import { CoinsBuyList } from 'entities/Coin/ui/CoinsBuyList/CoinsBuyList';
import { LeaderBoardList } from 'features/LeaderBoard';
import { Wallet } from 'widgets/Wallet';
import { WalletList } from 'widgets/WalletList';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { CardTheme } from 'shared/ui/Card/ui/Card';
import { NotificationList } from 'widgets/NotificationList';
import useWindowDimensions from 'shared/lib/hooks/useWindowDimensions';
import { Mods, classNames } from 'helpers/classNames/classNames';
import { DasboardReferal } from 'widgets/DasboardReferal';
import { QuickActions } from 'widgets/QuickActions';
import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
  const type = useSelector(getArticlesPageType);
  // const sort = useSelector(getSortType);
  // console.log('sort', sort);
  const orderBy = 'change';
  const orderDirection = 'asc';
  const { XXXLLayout, XXLLayout, XLLayout } = useWindowDimensions();

  const { data: conins } = useGetTopCoinsQuery({
    limit: 10,
    tags: [type],
    orderBy,
    orderDirection,
  });

  const mods: Mods = {
    [styles.DashboardPageLg]: !!XXXLLayout,
    [styles.DashboardPageXXL]: !!XXLLayout,
    [styles.DashboardPageXL]: !!XLLayout,
  };

  return (
    <Page>
      <div className={classNames(styles.DashboardPage, mods, [])}>
        <ContentWrapper
          title='Wallet Cryptocurrency'
          theme={CardTheme.NORMAL}
          className={styles.Wallet}
        >
          <Wallet className={styles.wallet} />
          <WalletList />
        </ContentWrapper>
        <CoinsBuyList coins={conins} className={styles.CoinsBuyList} />
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
