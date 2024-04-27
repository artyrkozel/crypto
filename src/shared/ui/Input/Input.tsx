import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
} from 'react';
import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Input.module.scss';

export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

export interface IInputProps extends HTMLInputProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      onChange,
      onChangeInput,
      type = 'string',
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const mods: Mods = {};

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChangeInput && onChangeInput(e);
        onChange && onChange(e);
      },
      [onChangeInput, onChange],
    );

    return (
      <div className={classNames(styles.inputContainer, mods, [className])}>
        <input
          className={styles.Input}
          onChange={onChangeHandler}
          type={type}
          placeholder={placeholder && placeholder.toUpperCase()}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

export default memo(Input);
