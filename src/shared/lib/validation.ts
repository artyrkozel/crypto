import * as yup from 'yup';

export const emailValidation = yup
  .string()
  .trim()
  .email()
  .required('Enter a valid email address');

export const passwordValidation = yup
  .string()
  .min(8, 'Enter at least 8 characters')
  .max(50, 'Maximum password length is 50 characters')
  .required('Enter a valid password');
