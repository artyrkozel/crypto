import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './LoginForm.module.scss';
import { classNames } from '@/helpers/classNames/classNames';
import { emailValidation, passwordValidation } from '@/shared/lib/validation';
import Button from '@/shared/ui/Button/Button';
import { ContentTitle } from '@/shared/ui/ContentTitle/ContentTitle';
import { usePostLoginMutation } from '@/entities/user/api/api';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { ControllerInput } from '@/shared/ui/ControllerInput/ControllerInput';

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

  const { handleSubmit } = methods;

  const [login, { isError }] = usePostLoginMutation();

  const onSubmit = async (data: IFormInputs) => {
    const res = await login(data).unwrap();
    if (res && !isError) {
      window.location.href = AppRoutes.MAIN;
    }
  };

  return (
    <div className={classNames(styles.container, {}, [])}>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginForm}>
            <ContentTitle className={styles.title}>Sing Up</ContentTitle>
            <ControllerInput
              className={styles.email}
              name='email'
              label='email'
              type='text'
              autoFocus
              placeholder='Enter your email'
              max={19}
            />
            <ControllerInput
              name='password'
              label='password'
              type='text'
              autoFocus
              placeholder='Enter your password'
              max={19}
              className={styles.password}
            />
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
