import { HStack } from 'shared/ui/Stack';
import { FC } from 'react';
import styles from './CardDesignPicker.module.scss';
import { CardDesignItem } from './CardDesignItem';

interface ICardDesignPickerProps {
  setMask: (mask: string) => void;
}

export const CardDesignPicker: FC<ICardDesignPickerProps> = ({ setMask }) => {
  const masksList = ['mask0', 'mask1', 'mask2', 'mask3', 'mask4', 'mask5'];

  return (
    <HStack justify='center' gap='8' className={styles.CardDesignPicker}>
      {masksList.map((el) => (
        <CardDesignItem mask={el} handleSelectMask={setMask} />
      ))}
    </HStack>
  );
};
