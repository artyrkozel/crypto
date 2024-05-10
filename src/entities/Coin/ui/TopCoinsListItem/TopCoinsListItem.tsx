import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import styles from './TopCoinsListItem.module.scss';
import { Text, TextColor, TextSize } from '@/shared/ui/Text';
import { classNames } from '@/helpers/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { ChartColors, ICoin } from '@/entities/Coin/model/types/coin';
import { numMask, round } from '@/shared/lib/numbers';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ChangePrice } from '@/widgets/ChangePrice';
import { Chart } from '@/widgets/Chart';
import { CardTheme } from '@/shared/ui/Card/ui/Card';

interface ArticleListItemProps {
  className?: string;
  coin: ICoin;
  target?: HTMLAttributeAnchorTarget;
}

export const TopCoinListItem = memo((props: ArticleListItemProps) => {
  const { className, coin, target } = props;

  const chartColor = +coin.change > 0 ? ChartColors.POSITIVE : ChartColors.NEGATIVE;

  const options: ApexOptions = {
    chart: {
      width: '65px',
      type: 'line',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    colors: [chartColor],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const series = useMemo(() => {
    const sparkToNumber = coin.sparkline.map((el) => Number(el));
    return [
      {
        name: coin.name,
        data: sparkToNumber,
      },
    ];
  }, [coin]);

  return (
    <AppLink
      data-testid='TopCoinListItem'
      target={target}
      to=''
      className={classNames(styles.TopCoinListItem, {}, [className])}
    >
      <Card className={styles.coinItem} theme={CardTheme.NORMAL}>
        <HStack justify='between' align='center' gap='16'>
          <HStack gap='8' style={{ flexBasis: '30%', minWidth: '40%' }}>
            <img
              src={coin.iconUrl}
              alt={coin.name}
              style={{ width: 40, height: 40 }}
            />
            <VStack gap='8'>
              <Text
                className={classNames(styles.coinText, {}, [styles.name])}
                text={coin.name}
                color={TextColor.secondary}
                size={TextSize.S}
              />
              <Text
                className={styles.coin_symbol}
                text={coin.symbol}
                color={TextColor.grey}
                size={TextSize.S}
              />
            </VStack>
          </HStack>
          <div style={{ flexBasis: '30%' }}>
            <Chart options={options} type='area' height='32' series={series} />
          </div>
          <VStack gap='8' align='end' style={{ flexBasis: '40%' }}>
            <Text
              text={`$ ${String(numMask(round(+coin.price)))}`}
              color={TextColor.secondary}
              className={styles.coinText}
              size={TextSize.S}
            />
            <ChangePrice changeValue={+coin.change} />
          </VStack>
        </HStack>
      </Card>
    </AppLink>
  );
});
