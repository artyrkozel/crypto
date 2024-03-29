import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';
import { Mods, classNames } from 'helpers/classNames/classNames';

export enum ButtonTheme {
	CLEAR = 'clear',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	OUTLINE = 'outline',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: 'primary' | 'secondary';
}

const Button: FC<IButtonProps> = ({
	className,
	children,
	variant = 'secondary',
	...rest
}) => {
	const mods: Mods = {
		[styles[variant]]: true,
	};

	return (
		<button
			className={classNames(styles.Button, mods, [
				className || '',
				styles[variant],
			])}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
