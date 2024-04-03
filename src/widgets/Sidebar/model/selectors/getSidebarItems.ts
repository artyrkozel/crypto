import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { MdOutlineContactPage } from 'react-icons/md';
import { selectIsAuthenticated } from 'entities/user';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  selectIsAuthenticated,
  () => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: RoutePath['/'],
        Icon: MdOutlineContactPage,
        text: 'Dashboard',
      },
      {
        path: RoutePath.wallet,
        Icon: MdOutlineContactPage,
        text: 'Wallet',
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
