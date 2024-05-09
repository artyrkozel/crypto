import { FC, MutableRefObject, useCallback, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from 'shared/ui/Button/Button';
import styles from './CreateCreditCard.module.scss';
import Card from '../CreditCard/Card';
import { CreditCardForm } from '../CreditCard/CreditCardForm';
import {
  ICardElementsRef,
  ICreditCardFields,
  IFormFieldsRefObj,
} from '../model/types';

interface ICreateCreditCard {
  onCloseModal: () => void;
}
/* eslint-disable */
/* tslint:disable */
export const CreateCreditCard: FC<ICreateCreditCard> = ({ onCloseModal }) => {
  const [currentFocusedElm, setCurrentFocusedElm] = useState<MutableRefObject<
    HTMLInputElement | HTMLSelectElement
  > | null>(null);

  const methods = useForm<ICreditCardFields>({
    mode: 'onChange',
    // resolver: yupResolver(FormSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      isCardFlipped: false,
    },
  });

  const { handleSubmit, setValue, watch } = methods;

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
          </CreditCardForm>
        </div>
        <Button type='submit' fullWidth>
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
