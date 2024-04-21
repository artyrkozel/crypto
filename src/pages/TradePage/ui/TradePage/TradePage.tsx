import { Page } from 'widgets/Page/Page';
import { classNames } from 'helpers/classNames/classNames';
import styles from './TradePage.module.scss';
import { TradePageCoins } from '../TradePageCoinsFilters/TradePageCoins';

const TradePage = () => {
  return (
    <Page pageTitle='Trade'>
      <div className={classNames(styles.TradePage)}>
        <TradePageCoins />
        <div style={{ gridArea: 'buyCrypto', border: '1px solid #e6e6e6' }}>
          buyCrypto
        </div>
        <div style={{ gridArea: 'deposit', border: '1px solid #e6e6e6' }}>
          deposit
        </div>
        <div style={{ gridArea: 'history', border: '1px solid #e6e6e6' }}>
          history
        </div>
        <div style={{ gridArea: 'wallet', border: '1px solid #e6e6e6' }}>
          wallet
        </div>
      </div>
    </Page>
  );
};

export default TradePage;
