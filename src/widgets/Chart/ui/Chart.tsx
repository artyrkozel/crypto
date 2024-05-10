import { ApexOptions } from 'apexcharts';
import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';
import { classNames } from '@/helpers/classNames/classNames';

interface IChartProps {
  series: ApexOptions['series'];
  options: ApexOptions;
  className?: string;
  type?: ApexChart['type'];
  height?: string;
}

export const Chart: FC<IChartProps> = ({
  options,
  series,
  className,
  type = 'area',
  height = 80,
}) => {
  return (
    <div className={classNames('', {}, [className || ''])} data-testid='Chart'>
      <ReactApexChart
        options={options}
        type={type}
        height={height}
        series={series}
      />
    </div>
  );
};
