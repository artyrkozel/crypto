import { HStack, VStack } from 'shared/ui/Stack';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { FC } from 'react';
import styles from './CreditCard.module.scss';
import cardChip from '../../../shared/assets/img/chip.png';
import cardLabel from '../../../shared/assets/img/visa-label.png';
import cardMask from '../../../shared/assets/img/card-effect.png';

export interface ICreditCard {
  id: number;
  cardHolder: string;
  expires: string;
  cardNumber: string;
}

interface ICreditCardProps {
  card: ICreditCard;
}

export const CreditCard: FC<ICreditCardProps> = ({ card }) => {
  return (
    <div className={styles.CreditCard}>
      <img
        src={cardMask}
        alt='mask'
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          objectFit: 'cover',
        }}
      />
      <HStack className={styles.card_chip} align='start' justify='between'>
        <img style={{ width: 45 }} src={cardChip} alt='chip' />
        <img style={{ maxWidth: 65 }} src={cardLabel} alt='label' />
      </HStack>
      <Text
        className={styles.card_number}
        text={card.cardNumber}
        size={TextSize.L}
      />

      <HStack className={styles.holder_wrapper} justify='between' align='end'>
        <VStack gap='8' className={styles.holder_wrapper}>
          <Text
            text='Card holder'
            color={TextColor.secondary}
            size={TextSize.S}
          />
          <Text
            className={styles.card_holer}
            text={card.cardHolder}
            color={TextColor.secondary}
            size={TextSize.M}
          />
        </VStack>

        <Text text={card.expires} />
      </HStack>
    </div>
  );
};
