import { classNames } from '@/helpers/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { FC, SVGProps } from 'react';
import styles from './SortIcon.module.scss';

function Sort(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' {...props}>
      <path
        d='M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9S19
        320.1 32 320.1h256c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z'
      />
    </svg>
  );
}

interface ISortIcon {
  asc?: boolean;
  desc?: boolean;
  className?: string;
}

export const SortIcon: FC<ISortIcon> = ({ className, asc, desc }) => {
  return (
    <span className={classNames(styles.SortIcon, {}, [className || ''])}>
      <Icon
        Svg={Sort}
        fill={asc ? '#171717' : '#B8B8B8'}
        color='red'
        width={12}
        height={12}
      />
      <Icon
        Svg={Sort}
        fill={desc ? '#171717' : '#B8B8B8'}
        color='red'
        width={12}
        height={12}
        transform='rotate(180)'
        style={{ marginTop: '-6px' }}
      />
    </span>
  );
};
