import { HStack } from '@/shared/ui/Stack';
import { IoIosArrowForward } from 'react-icons/io';
import { Text, TextColor, TextSize } from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { FC } from 'react';
import styles from './QuickActionsItem.module.scss';
import { IQuickAction } from '../QuickActions/QuickActions';

interface IQuickActionsItem {
  action: IQuickAction;
}

export const QuickActionsItem: FC<IQuickActionsItem> = ({ action }) => {
  return (
    <AppLink to={action.to} className={styles.QuickActionsItem}>
      <HStack justify='between' className={styles.wrapper2}>
        <HStack gap='8' className={styles.wrapper}>
          <action.icon color='#171717' fill='#e0f64b' size={24} />
          <Text text={action.title} color={TextColor.secondary} size={TextSize.XS} />
        </HStack>
        <div className={styles.arrow}>
          <IoIosArrowForward fill='current-color' size={16} />
        </div>
      </HStack>
    </AppLink>
  );
};
