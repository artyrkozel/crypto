import { FC, MutableRefObject, useCallback, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from 'shared/ui/Button/Button';
import { stringRequired } from 'shared/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './CreateCreditCard.module.scss';
import Card from '../CreditCard/Card';
import { CreditCardForm } from '../CreditCard/CreditCardForm';
import {
  ICardElementsRef,
  ICreditCardFields,
  IFormFieldsRefObj,
} from '../model/types';
import { CardDesignPicker } from '../CardDesignPicker/CardDesignPicker';

interface ICreateCreditCard {
  onCloseModal: () => void;
}

const CreditCardFormSchema = yup.object({
  cardHolder: stringRequired,
  cardNumber: stringRequired,
  cardMonth: stringRequired,
  cardYear: stringRequired,
  cardCvv: stringRequired,
}) as yup.ObjectSchema<ICreditCardFields>;

const defaultValues: ICreditCardFields = {
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false,
  mask: 'mask0',
};

/* eslint-disable */
/* tslint:disable */
export const CreateCreditCard: FC<ICreateCreditCard> = ({ onCloseModal }) => {
  const [currentFocusedElm, setCurrentFocusedElm] = useState<MutableRefObject<
    HTMLInputElement | HTMLSelectElement
  > | null>(null);

  const methods = useForm<ICreditCardFields>({
    mode: 'onChange',
    resolver: yupResolver(CreditCardFormSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  const updateStateValues = useCallback(
    (value: boolean) => {
      setValue('isCardFlipped', value);
    },
    [setValue],
  );

  const formFieldsRefObj: IFormFieldsRefObj = {
    cardNumber: useRef<HTMLInputElement | null>(null),
    cardHolder: useRef<HTMLInputElement>(null),
    cardDate: useRef<HTMLSelectElement>(null),
    cardCvv: useRef<HTMLInputElement>(null),
  };

  const focusFormFieldByKey = useCallback((key: keyof IFormFieldsRefObj) => {
    // @ts-ignore
    formFieldsRefObj[key] && formFieldsRefObj[key].current.focus();
  }, []);

  const cardElementsRef: ICardElementsRef = {
    cardNumber: useRef<HTMLInputElement | null>(null),
    cardHolder: useRef<HTMLInputElement | null>(null),
    cardDate: useRef<HTMLSelectElement | null>(null),
  };

  const onCardFormInputFocus = useCallback(
    (inputName: keyof ICardElementsRef) => {
      const refByName = cardElementsRef[
        inputName
      ] as MutableRefObject<HTMLInputElement>;
      setCurrentFocusedElm(refByName);
    },
    [setCurrentFocusedElm],
  );

  const onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  const setMaskValue = (mask: string) => setValue('mask', mask);

  const onSubmit = (data: ICreditCardFields) => {
    return data;
  };

  return (
    <FormProvider {...methods}>
      <Button className={styles.close_btn} onClick={onCloseModal}>
        close
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <CreditCardForm
            onUpdateState={updateStateValues}
            cardNumberRef={formFieldsRefObj.cardNumber}
            cardHolderRef={formFieldsRefObj.cardHolder}
            cardDateRef={formFieldsRefObj.cardDate}
            onCardInputFocus={onCardFormInputFocus}
            onCardInputBlur={onCardInputBlur}
          >
            <Card
              currentFocusedElm={currentFocusedElm}
              onCardElementClick={focusFormFieldByKey}
              cardNumberRef={cardElementsRef.cardNumber}
              cardHolderRef={cardElementsRef.cardHolder}
              cardDateRef={cardElementsRef.cardDate}
            />
            <CardDesignPicker setMask={setMaskValue} />
          </CreditCardForm>
        </div>
        <Button type='submit' fullWidth>
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
