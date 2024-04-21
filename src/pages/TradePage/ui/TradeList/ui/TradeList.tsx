import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCoinByIdQuery } from 'entities/Coin/model/api/api';
import { getTradeCoinId } from 'entities/Coin/model/selectors/getTradeCoinId/getTradeCoinId';
import { classNames } from 'helpers/classNames/classNames';
import { useSelector } from 'react-redux';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { CoinTrade } from 'entities/Coin/ui/CoinTrade/CoinTrade';
import { BuyCoin } from 'features/BuyCoin';
import styles from './TradeList.module.scss';

export const TradeList = () => {
  const coinTradeId = useSelector(getTradeCoinId);

  const { data: coinData } = useGetCoinByIdQuery({
    id: coinTradeId || skipToken,
    timePeriod: '7d',
  });

  return (
    <ContentWrapper
      title='Buy Crypto'
      className={classNames(styles.TradeList, {}, [])}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: '50%' }}>
          <CoinTrade coinData={coinData} showTradeButtons={false} />
        </div>
        <span className={styles.divider} />
        <div style={{ width: '50%' }}>
          <BuyCoin coinData={coinData} />
        </div>
      </div>
    </ContentWrapper>
  );
};
