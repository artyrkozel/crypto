import { useState } from 'react';
import { TradeCoinsList } from '../CoinsList/CoinsList';
import { ETradeTab } from '@/entities/Coin/model/consts/coinConsts';
import { TradeCoinsTypeFilters } from '@/features/TradeCoinsTabs';
import { useGetTopCoinsQuery } from '@/entities/Coin/model/api/api';

export const TradePageCoins = () => {
  const [tradeCoinType, setTradeCoinType] = useState<ETradeTab>(
    ETradeTab.STABLECOIN,
  );
  const orderBy = 'change';
  const orderDirection = 'asc';

  const { data: coinsList } = useGetTopCoinsQuery({
    limit: 20,
    tags: [tradeCoinType],
    orderBy,
    orderDirection,
  });

  const onChangeType = (type: ETradeTab) => {
    setTradeCoinType(type);
  };

  return (
    <div style={{ gridArea: 'tradeList' }}>
      <TradeCoinsTypeFilters
        onChangeType={onChangeType}
        value={tradeCoinType}
      />
      <TradeCoinsList coinsList={coinsList} />
    </div>
  );
};
