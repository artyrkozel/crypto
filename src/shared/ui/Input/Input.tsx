import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
} from 'react';
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
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  type?: string;
}

const Input: FC<IInputProps> = forwardRef(
  ({
    className,
    value,
    onChange,
    label,
    id,
    onChangeInput,
    type = 'string',
    ...rest
  }) => {
    const mods: Mods = {};

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChangeInput && onChangeInput(e);
        onChange && onChange(e);
      },
      [onChangeInput, onChange],
    );

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
          onChange={onChangeHandler}
          value={value}
          name={id}
          type={type}
          {...rest}
        />
      </div>
    );
  },
);

export default memo(Input);
