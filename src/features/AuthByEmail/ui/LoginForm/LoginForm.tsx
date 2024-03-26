import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from 'helpers/classNames/classNames';
import { FormProvider, useForm } from 'react-hook-form';
import { emailValidation, passwordValidation } from 'shared/lib/validation';
import Button from 'shared/ui/Button/Button';
import { ControlWrapperForm } from 'shared/ui/ControlWrapperForm/ControlWrapperForm';
import Input from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';
import * as yup from 'yup';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordFill } from 'react-icons/ri';
import { ContentTitle } from 'shared/ui/ContentTitle/ContentTitle';
import { usePostLoginMutation } from 'entities/user/api/api';

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

	const [login] = usePostLoginMutation();

	const onSubmit = async (data: IFormInputs) => {
		await login(data);
	};

	return (
		<div className={classNames(styles.container, {}, [])}>
			<FormProvider {...methods}>
				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.loginForm}>
						<ContentTitle className={styles.title}>Welcome!</ContentTitle>
						<ControlWrapperForm name='email' className={styles.email}>
							<Input
								// className={styles.email}
								placeholder='Enter your email'
								autoFocus={true}
								{...register('email')}
								beforeIcon={<CgProfile />}
							/>
						</ControlWrapperForm>
						<ControlWrapperForm name='password'>
							<Input
								className={styles.password}
								placeholder='Enter your password'
								autoFocus={true}
								{...register('password')}
								beforeIcon={<RiLockPasswordFill />}
							/>
						</ControlWrapperForm>
						<Button type='submit' variant='primary'>
							Login
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default LoginForm;
