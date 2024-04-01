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
  label?: string;
  id?: string;
}

const Input: FC<IInputProps> = memo(
  ({
    className,
    value,
    onChange,
    label,
    id,
    ...rest
  }) => {
    const mods: Mods = {};

    return (
      <div
        className={classNames(styles.inputContainer, mods, [className || ''])}
      >
        {label && (
          <label className={styles.lable} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={styles.Input}
          onChange={onChange}
          value={value}
          name={id}
          {...rest}
        />
      </div>
    );
  },
);

export default Input;
