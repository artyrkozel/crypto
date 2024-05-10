import { FC } from 'react';
import styles from './CardDesignItem.module.scss';
import { creditMask } from '@/shared/lib/icons';

interface ICardDesignItem {
  mask: string;
  handleSelectMask: (mask: string) => void;
}

export const CardDesignItem: FC<ICardDesignItem> = ({
  handleSelectMask,
  mask,
}) => {
  return (
    <div onClick={() => handleSelectMask(mask)}>
      <img className={styles.card_item_img} src={creditMask[mask]} alt='mask' />
    </div>
  );
};
