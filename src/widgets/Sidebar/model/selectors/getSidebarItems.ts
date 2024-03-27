import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { MdOutlineContactPage } from "react-icons/md";
import { selectIsAuthenticated } from 'entities/user';

export const getSidebarItems = createSelector(
    selectIsAuthenticated,
    () => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.overview,
                Icon: MdOutlineContactPage,
                text: 'Overview',
            },
            {
                path: RoutePath.walets,
                Icon: MdOutlineContactPage,
                text: 'Wallets',
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