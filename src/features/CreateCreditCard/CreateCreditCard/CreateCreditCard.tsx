import {
  ChangeEvent,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './CreateCreditCard.module.scss';
import Card from '../CreditCard/Card';
import CreditCardForm from '../CreditCard/CreditCardForm';
/* eslint-disable */
/* tslint:disable */
const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'FULL NAME',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false,
};

interface initialStateType {
  cardNumber: string;
  cardHolder: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  isCardFlipped: boolean;
}

interface IFormFieldsRefObj {
  cardNumber: MutableRefObject<HTMLInputElement | null>;
  cardHolder: MutableRefObject<HTMLInputElement | null>;
  cardDate: MutableRefObject<HTMLSelectElement | null>;
  cardCvv: MutableRefObject<HTMLInputElement | null>;
}

interface ICreditCardFields {
  cardNumber: string;
  cardHolder: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
}

// @ts-ignore

export const CreateCreditCard = () => {
  const [state, setState] = useState<initialStateType>(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

  const methods = useForm<ICreditCardFields>({
    mode: 'onChange',
    // resolver: yupResolver(FormSchema),
    defaultValues: {
      cardNumber: '#### #### #### ####',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    },
  });

  const updateStateValues = useCallback(
    (keyName: keyof initialStateType, value: keyof initialStateType) => {
      setState({
        ...state,
        [keyName]: value || initialState[keyName],
      });
    },
    [state],
  );

  const formFieldsRefObj: IFormFieldsRefObj = {
    cardNumber: useRef(null),
    cardHolder: useRef(null),
    cardDate: useRef(null),
    cardCvv: useRef(null),
  };

  const focusFormFieldByKey = useCallback(
    (key: keyof IFormFieldsRefObj) => {
      // @ts-expect-error
      formFieldsRefObj[key] && formFieldsRefObj[key].current.focus();
    },
    [formFieldsRefObj],
  );

  // @ts-ignore
  const cardElementsRef: any = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
  };

  const onCardFormInputFocus = (
    _event: ChangeEvent<HTMLInputElement>,
    inputName: string,
  ) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  const onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  const cardMonth = methods.watch('cardMonth');
  const cardYear = methods.watch('cardYear');

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <CreditCardForm
          cardMonth={cardMonth}
          cardYear={cardYear}
          onUpdateState={updateStateValues}
          cardNumberRef={formFieldsRefObj.cardNumber}
          cardHolderRef={formFieldsRefObj.cardHolder}
          cardDateRef={formFieldsRefObj.cardDate}
          onCardInputFocus={onCardFormInputFocus}
          onCardInputBlur={onCardInputBlur}
        >
          <Card
            isCardFlipped={state.isCardFlipped}
            currentFocusedElm={currentFocusedElm}
            onCardElementClick={focusFormFieldByKey}
            cardNumberRef={cardElementsRef.cardNumber}
            cardHolderRef={cardElementsRef.cardHolder}
            cardDateRef={cardElementsRef.cardDate}
          />
        </CreditCardForm>
      </div>
    </FormProvider>
  );
};
