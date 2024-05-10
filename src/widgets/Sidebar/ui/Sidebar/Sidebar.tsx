import { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './Sidebat.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { Mods, classNames } from '@/helpers/classNames/classNames';
import Button from '@/shared/ui/Button/Button';
import { getSidebarItems } from '@/widgets/Sidebar/model/selectors/getSidebarItems';
import { LangSwitcher } from '@/shared/ui/LangSwitcher/LangSwitcher';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { authActions } from '@/entities/user/model/slice';
import { Logo } from '@/shared/ui/Logo';
import useWindowDimensions from '@/shared/lib/hooks/useWindowDimensions';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const { XXXLLayout } = useWindowDimensions();
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

  const mods: Mods = {
    [styles.collapsed]: collapsed,
    [styles.Sidebar_lg]: XXXLLayout,
  };

  return (
    <aside
      data-testid='sidebar'
      className={classNames(styles.Sidebar, mods, [className])}
    >
      <div>
        <div className={styles.logoWrapper}>
          <Logo collapsed={collapsed} />
        </div>
        <div>{itemsList}</div>
      </div>
      <div>
        <Button
          variant='primary'
          onClick={onToggle}
          className={styles.collapseBtn}
        >
          {collapsed ? '>' : '<'}
        </Button>
        <LangSwitcher clasNames={styles.lang} />
        <Button variant='primary' onClick={onLogout}>
          Logout
        </Button>
      </div>
    </aside>
  );
});
