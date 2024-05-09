import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  memo,
  useCallback,
} from 'react';
import { Mods, classNames } from 'helpers/classNames/classNames';
import InputMask from 'react-input-mask';
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
  value?: string;
  mask?: string;
  name: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      onChange,
      onChangeInput,
      type = 'string',
      placeholder,
      mask,
      name,
      value,
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
        <InputMask
          className={styles.Input}
          name={name}
          mask={mask || ''}
          maskChar=' '
          alwaysShowMask={false}
          onChange={onChangeHandler}
          type={type}
          placeholder={placeholder && placeholder.toUpperCase()}
          inputRef={ref}
          onBlur={rest.onBlur}
          onFocus={rest.onFocus}
          value={value?.toString()}
          {...rest}
        />
      </div>
    );
  },
);

export default memo(Input);
