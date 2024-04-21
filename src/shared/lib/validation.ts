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

export const priceValidation = yup
  .string()
  .required('Required field');

export const selectObjectValidation = yup.object({
  value: yup.mixed().required('Required field'),
}).required('Required field');
