import { HStack, VStack } from '@/shared/ui/Stack';
import { TextSize, Text, TextColor } from '@/shared/ui/Text';
import { FC } from 'react';
import { crediCardMasked } from '@/shared/lib/masks';
import { creditMask } from '@/shared/lib/icons';
import styles from './CreditCard.module.scss';
import cardChip from '../../../shared/assets/img/chip.png';
import cardLabel from '../../../shared/assets/img/visa-label.png';

export interface ICreditCard {
  id: number;
  cardHolder: string;
  expires: string;
  cardNumber: string;
}

interface ICreditCardProps {
  card: ICreditCard;
}

const cardBackgroundName = () => {
  const random = Math.floor(Math.random() * 4);
  return `mask${random}`;
};

export const CreditCard: FC<ICreditCardProps> = ({ card }) => {
  const BACKGROUND_IMG = cardBackgroundName();

  return (
    <VStack align='normal' className={styles.CreditCard}>
      <img
        className={styles.card_mask}
        src={creditMask[BACKGROUND_IMG]}
        alt='mask'
      />
      <HStack className={styles.card_chip} align='start' justify='between'>
        <img className={styles.chip} src={cardChip} alt='chip' />
        <img className={styles.card_label} src={cardLabel} alt='label' />
      </HStack>
      <Text
        className={styles.card_number}
        text={crediCardMasked(card.cardNumber)}
        size={TextSize.L}
      />

      <HStack className={styles.holder_wrapper} justify='between' align='end'>
        <VStack gap='4'>
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
            uppercase
          />
        </VStack>
        <VStack gap='4'>
          <Text text='Expires' color={TextColor.secondary} size={TextSize.S} />
          <Text text={card.expires} uppercase />
        </VStack>
      </HStack>
    </VStack>
  );
};
