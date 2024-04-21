import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { selectIsAuthenticated } from 'entities/user';
import { menuIconsMap } from 'shared/lib/icons';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  selectIsAuthenticated,
  () => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutePath['/'],
        Icon: menuIconsMap.Dashboard,
        text: 'Dashboard',
      },
      {
        path: RoutePath.trade,
        Icon: menuIconsMap.Trade,
        text: 'Trade',
      },
    ];

    // if (userData) {
    //     sidebarItemsList.push(
    //         {
    //             path: RoutePath.profile + userData.id,
    //             Icon: ProfileIcon,
    //             text: 'Профиль',
    //             authOnly: true,
    //         },
    //         {
    //             path: RoutePath.articles,
    //             Icon: ArticleIcon,
    //             text: 'Статьи',
    //             authOnly: true,
    //         },
    //     );
    // }

    return sidebarItemsList;
  },
);
