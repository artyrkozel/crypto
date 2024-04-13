import { classNames } from 'helpers/classNames/classNames';
import { FC, ReactNode, memo } from 'react';
import { Card } from 'shared/ui/Card';
import { Text } from 'shared/ui/Text';
import { CardTheme } from 'shared/ui/Card/ui/Card';
import styles from './ContentWrapper.module.scss';

interface IContentWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  theme?: CardTheme;
  overflow?: boolean;
}

export const ContentWrapper: FC<IContentWrapperProps> = memo(
  ({ children, className, theme, title, overflow = false }) => {
    return (
      <div className={classNames(styles.ContentWrapper, {}, [className])}>
        {title && <Text className={styles.title} title={title} />}
        <Card theme={theme} overflowY={overflow}>
          {children}
        </Card>
      </div>
    );
  },
);
