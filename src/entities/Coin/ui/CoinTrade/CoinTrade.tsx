import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCoinByIdQuery } from 'entities/Coin/model/api/api';
import { getTradeCoinId } from 'pages/DashboardPage/model/selectors/dashboardPageSelectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { transformCoinPrice } from 'shared/lib/numbers';
import { HStack, VStack } from 'shared/ui/Stack';
import { ChangePrice } from 'widgets/ChangePrice';
import { Chart } from 'widgets/Chart';
import { ApexOptions } from 'apexcharts';
import { ChartColors } from 'entities/Coin/model/types/coin';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import Button from 'shared/ui/Button/Button';
import styles from './CoinTrade.module.scss';

export const CoinTrade = () => {
  const coinTradeId = useSelector(getTradeCoinId);

  const { data: coinData, isLoading } = useGetCoinByIdQuery({
    id: coinTradeId || skipToken,
    timePeriod: '7d',
  });

  const chartColor = coinData && +coinData.change > 0
    ? ChartColors.POSITIVE
    : ChartColors.NEGATIVE;

  const options: ApexOptions = {
    chart: {
      width: '150px',
      type: 'line',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    colors: [chartColor],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    grid: {
      show: true,
      strokeDashArray: 4,

      padding: {
        left: 4,
        right: 5,
        top: 0,
      },
    },
    xaxis: {
      labels: {
        show: false,
        formatter() {
          return '';
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      opposite: true,
      show: true,
      labels: {
        formatter(value) {
          const val = Math.abs(value);

          return String(val);
        },
      },
    },
  };

  const series = useMemo(() => {
    if (!coinData) {
      return [];
    }
    const sparkToNumber = coinData.sparkline.map((el) => Number(el));
    return [
      {
        name: coinData.name,
        data: sparkToNumber,
      },
    ];
  }, [coinData]);

  if (isLoading) return <div>loading...</div>;

  if (!coinData) {
    return <div>No data</div>;
  }

  return (
    <>
      <HStack justify='between' align='end'>
        <VStack gap='8'>
          <Text title={coinData?.name} size={TextSize.S} />
          <Text title={transformCoinPrice(coinData.price)} size={TextSize.S} />
        </VStack>

        <VStack align='end'>
          <ChangePrice
            className={styles.change_price}
            changeValue={+coinData.change}
          />
          <HStack className={styles.market_cap} justify='between'>
            <Text
              color={TextColor.secondary}
              text='market cap'
              size={TextSize.XS}
            />
            <Text
              color={TextColor.secondary}
              text={coinData.marketCap}
              size={TextSize.XS}
            />
          </HStack>
          <HStack className={styles.market_cap} justify='between'>
            <Text
              color={TextColor.secondary}
              text='24h volume'
              size={TextSize.XS}
            />
            <Text
              color={TextColor.secondary}
              text={transformCoinPrice(coinData['24hVolume'])}
              size={TextSize.XS}
            />
          </HStack>
        </VStack>
      </HStack>
      <div>
        <Chart options={options} series={series} type='line' height='270' />
        <HStack justify='around' style={{ marginTop: 36 }}>
          <Button fullWidth style={{ marginRight: 16 }}>
            Sell
          </Button>
          <Button variant='primary' fullWidth>
            Buy
          </Button>
        </HStack>
      </div>
    </>
  );
};
