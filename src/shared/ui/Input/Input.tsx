import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Input.module.scss';
import { FC, InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>;

export interface IInputProps extends HTMLInputProps {
	className?: string;
	variant?: 'primary' | 'secondary';
	value?: string;
	onChange?: (value: string) => void;
	beforeIcon?: React.ReactNode;
	afterIcon?: React.ReactNode;
}

const Input: FC<IInputProps> = memo(
	({ className, value, onChange, beforeIcon, afterIcon, ...rest }) => {
		const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(e.target.value);
		};

		const mods: Mods = {
			beforeIcon: styles.inputWithBeforeIcon,
			afterIcon: styles.inputWithAfterIcon,
		};

		return (
			<div className={styles.inputContainer}>
				{beforeIcon && <span className={styles.beforeIcon}>{beforeIcon}</span>}
				<input
					className={classNames(styles.Input, mods, [className || ''])}
					onChange={onChangeHandler}
					value={value}
					{...rest}
				/>
				{afterIcon && <span className={styles.afterIcon}>{afterIcon}</span>}
			</div>
		);
	},
);

export default Input;
