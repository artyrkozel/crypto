import { Page } from 'widgets/Page/Page';
import { classNames } from 'helpers/classNames/classNames';
import { Wallet } from 'entities/Wallet';
import styles from './TradePage.module.scss';
import { TradePageCoins } from '../TradePageCoinsFilters/TradePageCoins';
import { TradeList } from '../TradeList';
import { TransationHistory } from '../TransationHistory/TransationHistory';

const TradePage = () => {
  return (
    <Page pageTitle='Trade'>
      <div className={classNames(styles.TradePage)}>
        <TradePageCoins />
        <TradeList />
        <div style={{ gridArea: 'deposit', border: '1px solid #e6e6e6' }}>
          deposit
        </div>
        <TransationHistory />
        <Wallet />
      </div>
    </Page>
  );
};

export default TradePage;
