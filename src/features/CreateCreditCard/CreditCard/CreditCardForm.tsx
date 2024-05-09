import { ChangeEvent, FC, ReactNode, RefObject } from 'react';
import { ControllerInput } from 'shared/ui/ControllerInput/ControllerInput';
import { ControllerSelect } from 'shared/ui/ControllerSelect/ControllerSelect';
import { monthOptions, yearsArr } from 'shared/lib/utils';
import { HStack, VStack } from 'shared/ui/Stack';
import styles from './CreditCardForm.module.scss';
import { ICardElementsRef } from '../model/types';

interface ICreditCardForm {
  onUpdateState: (value: boolean) => void;
  onCardInputFocus: (inputName: keyof ICardElementsRef) => void;
  cardNumberRef: RefObject<HTMLInputElement>;
  cardHolderRef: RefObject<HTMLInputElement>;
  cardDateRef: RefObject<HTMLSelectElement>;
  children: ReactNode;
  onCardInputBlur: () => void;
}

export const CreditCardForm: FC<ICreditCardForm> = ({
  onUpdateState,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  onCardInputFocus,
  onCardInputBlur,
  children,
}) => {
  const onCvvFocus = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onUpdateState(true);
  };

  const onCvvBlur = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onUpdateState(false);
  };

  return (
    <div className='card-form'>
      <div>{children}</div>
      <VStack className={styles.wrapper} gap='8'>
        <ControllerInput
          name='cardNumber'
          placeholder='Card number'
          onFocus={() => onCardInputFocus('cardNumber')}
          ref={cardNumberRef}
          onBlur={onCardInputBlur}
          autoComplete='off'
          inputType='mask'
          mask='9999 9999 9999 9999'
        />
        <ControllerInput
          name='cardHolder'
          type='text'
          autoComplete='off'
          placeholder='FULL NAME'
          onFocus={() => onCardInputFocus('cardHolder')}
          ref={cardHolderRef}
          onBlur={onCardInputBlur}
        />
        <HStack gap='8'>
          <ControllerSelect
            name='cardMonth'
            ref={cardDateRef}
            onBlur={onCardInputBlur}
            onFocus={() => onCardInputFocus('cardDate')}
            placeHolder='cardMonth'
            options={monthOptions}
          />
          <ControllerSelect
            name='cardYear'
            ref={cardDateRef}
            onBlur={onCardInputBlur}
            onFocus={() => onCardInputFocus('cardDate')}
            placeHolder='cardYear'
            options={yearsArr}
          />
          <ControllerInput
            maxLength={4}
            onFocus={onCvvFocus}
            onBlur={onCvvBlur}
            placeholder='CVV'
            name='cardCvv'
          />
        </HStack>
      </VStack>
    </div>
  );
};
