import { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ControlWrapperForm } from 'shared/ui/ControlWrapperForm/ControlWrapperForm';
import { IOptions } from 'shared/ui/Dropdown/Dropdown';
import Input from 'shared/ui/Input/Input';
import { Select } from 'shared/ui/Select';
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
  const { register, setValue, control } = useFormContext();

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
          <ControlWrapperForm name='cardNumber'>
            <Input
              {...register('cardNumber')}
              type='number'
              autoComplete='off'
              max={19}
              onFocus={(e) => onCardInputFocus(e, 'cardNumber')}
              ref={cardNumberRef}
              onBlur={onCardInputBlur}
              // value={cardNumber}
              onChange={onCardNumberChange}
            />
          </ControlWrapperForm>
        </div>

        <div className='card-input'>
          <ControlWrapperForm name='cardHolder'>
            <Input
              {...register('cardHolder')}
              type='text'
              autoComplete='off'
              placeholder='FULL NAME'
              max={19}
              onFocus={(e) => onCardInputFocus(e, 'cardHolder')}
              ref={cardHolderRef}
              onBlur={onCardInputBlur}
            />
          </ControlWrapperForm>
        </div>

        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='card-form__group'>
              <ControlWrapperForm name='cardMonth'>
                <Select
                  {...register('cardMonth')}
                  options={monthOptions}
                  ref={cardDateRef}
                  onBlur={onCardInputBlur}
                  onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                  placeholder='Month'
                />
              </ControlWrapperForm>
              <ControlWrapperForm name='cardYear'>
                <Select
                  {...register('cardYear')}
                  options={yearsArr}
                  ref={cardDateRef}
                  onBlur={onCardInputBlur}
                  onFocus={(e) => onCardInputFocus(e, 'cardDate')}
                  placeholder='Year'
                />
              </ControlWrapperForm>
            </div>
          </div>
          <div className='card-form__col -cvv'>
            <Controller
              name='cardCvv'
              control={control}
              render={() => (
                <Input
                  {...register('cardCvv')}
                  type='text'
                  autoComplete='off'
                  placeholder='CVV'
                  max={19}
                  onFocus={onCvvFocus}
                  onBlur={onCvvBlur}
                  ref={cardCvv}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
