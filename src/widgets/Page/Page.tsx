import { FC, memo, ReactNode } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { Text } from 'shared/ui/Text';
import styles from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page: FC<PageProps> = memo(({ className, children }) => {
  return (
    <main className={classNames(styles.Page, {}, [className || ''])}>
      <Text title='Dashboard' className={styles.pageTitle} />
      {children}
    </main>
  );
});
