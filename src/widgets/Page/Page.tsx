import { FC, memo, ReactNode } from 'react';
import styles from './Page.module.scss';
import { classNames } from '@/helpers/classNames/classNames';
import { Text } from '@/shared/ui/Text';

interface PageProps {
  className?: string;
  children: ReactNode;
  pageTitle?: string;
}

export const Page: FC<PageProps> = memo(
  ({ className, pageTitle = '', children }) => {
    return (
      <main className={classNames(styles.Page, {}, [className || ''])}>
        <Text title={pageTitle} className={styles.pageTitle} />
        {children}
      </main>
    );
  },
);
