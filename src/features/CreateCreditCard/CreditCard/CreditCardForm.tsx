import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { ControllerInput } from 'shared/ui/ControllerInput/ControllerInput';
import { ControllerSelect } from 'shared/ui/ControllerSelect/ControllerSelect';
import { IOptions } from 'shared/ui/Dropdown/Dropdown';
/* eslint-disable */
/* tslint:disable */
const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? `0${month}` : month;
});

const monthOptions: IOptions[] = monthsArr.map((el) => {
  const opt = { label: String(el), value: String(el) };
  return opt;
});

const yearsArr: IOptions[] = Array.from({ length: 9 }, (_x, i) => ({
  label: String(currentYear + i),
  value: String(currentYear + i),
}));

export default function CreditCardForm({
  onUpdateState,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
  onCardInputFocus,
  onCardInputBlur,
  cardCvv,
  children,
}: any) {
  const { setValue } = useFormContext();

  // TODO: We can improve the regex check with a better approach like in the card component.
  const onCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    let cardNumber = value;

    if (/^3[47]\d{0,13}$/.test(value)) {
      cardNumber = value
        .replace(/(\d{4})/, '$1 ')
        .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
      // diner's club, 14 digits
      cardNumber = value
        .replace(/(\d{4})/, '$1 ')
        .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    } else if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      cardNumber = value
        .replace(/(\d{4})/, '$1 ')
        .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
        .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
    }
    setValue('cardNumber', cardNumber.trimRight());
    onUpdateState(name, cardNumber);
  };

  const onCvvFocus = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onUpdateState('isCardFlipped', true);
  };

  const onCvvBlur = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onUpdateState('isCardFlipped', false);
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
            max={19}
            onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
            ref={cardNumberRef}
            onBlur={onCardInputBlur}
          />
        </div>
        <div className='card-input'>
          <ControllerInput
            name='cardHolder'
            type='text'
            autoComplete='off'
            placeholder='FULL NAME'
            max={19}
            onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
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
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                placeHolder='cardMonth'
                options={monthOptions}
              />
              <ControllerSelect
                name='cardYear'
                ref={cardDateRef}
                onBlur={onCardInputBlur}
                onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                placeHolder='cardYear'
                options={yearsArr}
              />
            </div>
          </div>
          <div className='card-form__col -cvv'>
            <ControllerInput
              ref={cardCvv}
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
}
