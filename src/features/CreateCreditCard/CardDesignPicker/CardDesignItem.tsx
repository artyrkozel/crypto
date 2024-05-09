import { FC } from 'react';
import { creditMask } from 'shared/lib/icons';
import styles from './CardDesignItem.module.scss';

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
