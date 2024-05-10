import { FC, memo } from 'react';
import { classNames } from '@/helpers/classNames/classNames';
import { Text, TextColor, TextSize } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import styles from './Banners.module.scss';
import bannerMask from '../../../assets/banner-mask.png';

interface ChangePriceProps {
  className?: string;
  title?: string;
  text?: string;
  img?: string;
}

export const Banner: FC<ChangePriceProps> = memo(
  ({ className, text, title, img }) => {
    return (
      <div className={classNames(styles.Banner, {}, [className])}>
        <img className={styles.banner_mask} src={bannerMask} alt='banner' />
        <HStack>
          <VStack>
            <Text size={TextSize.L} text={title} classNameText={styles.title} />
            <Text size={TextSize.XS} text={text} color={TextColor.grey} />
          </VStack>
          <img className={styles.referal_img} src={img} alt='referal-banner' />
        </HStack>
      </div>
    );
  },
);
