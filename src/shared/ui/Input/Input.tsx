import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  MutableRefObject,
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
  ref?: MutableRefObject<HTMLInputElement>;
}

const Input: FC<IInputProps> = ({
  className,
  value,
  onChange,
  label,
  id,
  onChangeInput,
  type = 'string',
  ref,
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
    <div className={classNames(styles.inputContainer, mods, [className])}>
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
        ref={ref}
        {...rest}
      />
    </div>
  );
};

export default memo(Input);
