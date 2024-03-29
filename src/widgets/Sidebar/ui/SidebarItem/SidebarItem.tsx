import { memo } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useLocation } from 'react-router-dom';
import styles from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const location = useLocation();

  return (
    <AppLink
      to={item.path}
      className={classNames(
        styles.item,
        {
          [styles.collapsed]: collapsed,
          [styles.active]: location.pathname === item.path,
        },
        [],
      )}
    >
      <item.Icon className={styles.icon} />
      <span className={styles.link}>{item.text}</span>
    </AppLink>
  );
});
