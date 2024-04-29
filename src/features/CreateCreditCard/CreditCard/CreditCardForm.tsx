import { ChangeEvent, FC, ReactNode, RefObject } from 'react';
import { ControllerInput } from 'shared/ui/ControllerInput/ControllerInput';
import { ControllerSelect } from 'shared/ui/ControllerSelect/ControllerSelect';
import { monthOptions, yearsArr } from 'shared/lib/utils';
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
      <div className='card-list'>{children}</div>
      <div className='card-form__inner'>
        <div className='card-input'>
          <ControllerInput
            name='cardNumber'
            type='number'
            placeholder='Card number'
            onFocus={() => onCardInputFocus('cardNumber')}
            ref={cardNumberRef}
            onBlur={onCardInputBlur}
            autoComplete='off'
          />
        </div>
        <div className='card-input'>
          <ControllerInput
            name='cardHolder'
            type='text'
            autoComplete='off'
            placeholder='FULL NAME'
            onFocus={() => onCardInputFocus('cardHolder')}
            ref={cardHolderRef}
            onBlur={onCardInputBlur}
          />
        </div>

        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='card-form__group'>
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
            </div>
          </div>
          <div className='card-form__col -cvv'>
            <ControllerInput
              type='text'
              onFocus={onCvvFocus}
              onBlur={onCvvBlur}
              placeholder='CVV'
              label='cv'
              name='cardCvv'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
