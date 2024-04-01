import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from 'helpers/classNames/classNames';
import { FormProvider, useForm } from 'react-hook-form';
import { emailValidation, passwordValidation } from 'shared/lib/validation';
import Button from 'shared/ui/Button/Button';
import { ControlWrapperForm } from 'shared/ui/ControlWrapperForm/ControlWrapperForm';
import Input from 'shared/ui/Input/Input';
import * as yup from 'yup';
import { ContentTitle } from 'shared/ui/ContentTitle/ContentTitle';
import { usePostLoginMutation } from 'entities/user/api/api';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { QueryStatus } from '@reduxjs/toolkit/query';
import styles from './LoginForm.module.scss';

const FormSchema = yup
  .object()
  .shape({
    email: emailValidation,
    password: passwordValidation,
  })
  .required();

interface IFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const methods = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit } = methods;

  const [login, { status }] = usePostLoginMutation();

  const onSubmit = async (data: IFormInputs) => {
    const res = await login(data);
    if (res && status && status === QueryStatus.fulfilled) {
      window.location.href = AppRoutes.OVERVIEW;
    }
  };

  return (
    <div className={classNames(styles.container, {}, [])}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginForm}>
            <ContentTitle className={styles.title}>Sing Up</ContentTitle>
            <ControlWrapperForm name='email' className={styles.email}>
              <Input
                placeholder='Enter your email'
                autoFocus
                {...register('email')}
                label='email'
              />
            </ControlWrapperForm>
            <ControlWrapperForm name='password'>
              <Input
                className={styles.password}
                placeholder='Enter your password'
                autoFocus
                {...register('password')}
                label='password'
              />
            </ControlWrapperForm>
            <Button type='submit' variant='primary' fullWidth>
              Login
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
