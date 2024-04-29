import { RefObject } from "react";

export interface IFormFieldsRefObj {
    cardNumber: RefObject<HTMLInputElement>;
    cardHolder: RefObject<HTMLInputElement>;
    cardDate: RefObject<HTMLSelectElement>;
    cardCvv: RefObject<HTMLInputElement>;
  }

export type ICardElementsRef = Omit<IFormFieldsRefObj, 'cardCvv'>;

export interface ICreditCardFields {
    cardNumber: string;
    cardHolder: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;
    isCardFlipped: boolean;
}
