import { memo, ReactNode, useCallback } from 'react';
import styles from './Tabs.module.scss';
import { classNames } from '@/helpers/classNames/classNames';
import Button from '@/shared/ui/Button/Button';

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
        <Button
          className={classNames(styles.tab, {
            [styles.active]: value === tab.value,
          })}
          onClick={clickHandle(tab)}
        >
          {tab.value}
        </Button>
      ))}
    </div>
  );
});
