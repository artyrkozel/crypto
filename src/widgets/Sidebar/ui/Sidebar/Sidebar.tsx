import { classNames } from 'helpers/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import Button from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarItems } from 'widgets/Sidebar/model/selectors/getSidebarItems';
import { useLocation } from 'react-router-dom';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { authActions } from 'entities/user/model/slice';
import styles from './Sidebat.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const location = useLocation();
  const dispatch = useDispatch();
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => (
      <SidebarItem item={item} collapsed={collapsed} key={item.path} />
    )),
    [collapsed, sidebarItemsList],
  );

  if (location.pathname === '/login') {
    return null;
  }

  const onLogout = () => {
    dispatch(authActions.setLoggedOut());
    window.location.href = AppRoutes.LOGIN;
  };

  return (
    <aside
      data-testid='sidebar'
      className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [
        className || '',
      ])}
    >
      <div>{itemsList}</div>
      <Button onClick={onToggle} className={styles.collapseBtn}>
        {collapsed ? '>' : '<'}
      </Button>
      <LangSwitcher clasNames={styles.lang} />
      <Button onClick={onLogout}>Logout</Button>
    </aside>
  );
});
