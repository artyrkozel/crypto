import { ChangeEvent, FC, InputHTMLAttributes, memo } from 'react';
import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>;

export interface IInputProps extends HTMLInputProps {
	className?: string;
	variant?: 'primary' | 'secondary';
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	beforeIcon?: React.ReactNode;
	afterIcon?: React.ReactNode;
}

const Input: FC<IInputProps> = memo(
	({ className, value, onChange, beforeIcon, afterIcon, ...rest }) => {
		// const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 	onChange?.(e.target.value);
		// };

		const mods: Mods = {
			beforeIcon: styles.inputWithBeforeIcon,
			afterIcon: styles.inputWithAfterIcon,
		};

		return (
			<div
				className={classNames(styles.inputContainer, mods, [className || ''])}
			>
				{beforeIcon && <span className={styles.beforeIcon}>{beforeIcon}</span>}
				<input
					className={styles.Input}
					onChange={onChange}
					value={value}
					{...rest}
				/>
				{afterIcon && <span className={styles.afterIcon}>{afterIcon}</span>}
			</div>
		);
	},
);

export default Input;
