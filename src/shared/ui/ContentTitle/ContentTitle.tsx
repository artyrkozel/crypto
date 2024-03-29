import React from 'react';
import { classNames } from 'helpers/classNames/classNames';
import styles from './ContentTitle.module.scss';

export type ControlWrapperProps = {
  children: string;
  className?: string;
};

export const ContentTitle: React.FC<ControlWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <h1 className={classNames(styles.contentTitle, {}, [className || ''])}>
      {children}
    </h1>
  );
};
