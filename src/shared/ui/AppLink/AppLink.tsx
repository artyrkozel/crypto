import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import styles from './AppLink.module.scss';
import { classNames } from '@/helpers/classNames/classNames';

interface AppLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(styles.AppLink, {}, [className || ''])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
