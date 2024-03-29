import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';

import { classNames } from 'helpers/classNames/classNames';
import styles from './AppLink.module.scss';

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
