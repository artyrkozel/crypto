import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { CardTheme } from 'shared/ui/Card/ui/Card';
import styles from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, onTabClick, value } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(styles.Tabs, {}, [className || ''])}>
      {tabs.map((tab) => (
        <Card
          className={styles.tab}
          theme={tab.value === value ? CardTheme.OUTLINED : CardTheme.NORMAL}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});