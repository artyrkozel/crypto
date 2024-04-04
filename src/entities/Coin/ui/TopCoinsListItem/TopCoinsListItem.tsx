import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react';
import { Text, TextColor } from 'shared/ui/Text';
import { classNames } from 'helpers/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ChartColors, ICoin } from 'entities/Coin/model/types/coin';
import { ApexOptions } from 'apexcharts';
import { numMask, round } from 'shared/lib/numbers';
import { HStack } from 'shared/ui/Stack';
import { ChangePrice } from 'widgets/ChangePrice';
import { Chart } from 'widgets/Chart';
import styles from './TopCoinsListItem.module.scss';

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
      width: '150px',
      type: 'area',
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
        opacityFrom: 0.75,
        opacityTo: 0,
        shade: chartColor,
        gradientToColors: [chartColor],
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
      categories: [
        '01 February',
        '02 February',
        '03 February',
        '04 February',
        '05 February',
        '06 February',
        '07 February',
      ],
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
      className={classNames('', {}, [className || ''])}
    >
      <Card className={styles.coinItem}>
        <HStack justify='between' align='end' className={styles.coinWrapper}>
          <div>
            <img src={coin.iconUrl} alt='' style={{ width: 40, height: 40 }} />
            <Text
              className={classNames(styles.coinText, {}, [styles.name])}
              text={coin.name}
              color={TextColor.secondary}
            />
          </div>
          <div>
            <Text
              text={`$ ${String(numMask(round(+coin.price)))}`}
              color={TextColor.secondary}
              className={classNames(styles.coinText, {}, [styles.price])}
            />
            <ChangePrice changeValue={+coin.change} />
          </div>
        </HStack>
        <Chart options={options} type='area' height='80' series={series} />
      </Card>
    </AppLink>
  );
});
