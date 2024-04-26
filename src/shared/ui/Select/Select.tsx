import {
  ChangeEvent,
  MutableRefObject,
  SelectHTMLAttributes,
  useMemo,
} from 'react';

import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Select.module.scss';
import { IOptions } from '../Dropdown/Dropdown';

type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
>;

interface SelectProps extends HTMLSelectProps {
  className?: string;
  label?: string;
  options?: IOptions[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  readonly?: boolean;
  ref?: MutableRefObject<HTMLSelectElement>;
  placeholder?: string;
}

export const Select = (props: SelectProps) => {
  const {
    className,
    label,
    options,
    onChange,
    value,
    readonly,
    placeholder,
    ...rest
  } = props;

  const optionsList = useMemo(
    () => options?.map((opt) => (
      <option className={styles.option} value={opt.value} key={opt.value}>
        {opt.label}
      </option>
    )),
    [options],
  );

  const mods: Mods = {};

  return (
    <div className={classNames(styles.Wrapper, mods, [className])}>
      {label && <span className={styles.label}>{`${label}`}</span>}
      <select
        {...rest}
        disabled={readonly}
        className={styles.select}
        value={value}
        onChange={onChange}
      >
        <option disabled selected value=''>
          {placeholder ?? ''}
        </option>
        {optionsList}
      </select>
    </div>
  );
};
