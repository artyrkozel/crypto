import { classNames } from 'helpers/classNames/classNames';
import { FC, ReactNode } from 'react';
import { Card } from 'shared/ui/Card';
import { Text } from 'shared/ui/Text';
import styles from './ContentWrapper.module.scss';

interface IContentWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const ContentWrapper: FC<IContentWrapperProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={classNames(styles.ContentWrapper, {}, [className || ''])}>
      {title && <Text title={title} />}
      <Card>{children}</Card>
    </div>
  );
};
