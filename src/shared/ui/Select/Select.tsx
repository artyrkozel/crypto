import { ChangeEvent, useMemo } from 'react';

import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
  icon?: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, onChange, value, readonly } = props;

  const optionsList = useMemo(
    () => options?.map((opt) => (
      <option className={styles.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    )),
    [options],
  );

  const mods: Mods = {};

  return (
    <div className={classNames(styles.Wrapper, mods, [className || ''])}>
      {label && <span className={styles.label}>{`${label}`}</span>}
      <select
        disabled={readonly}
        className={styles.select}
        value={value}
        onChange={onChange}
      >
        {optionsList}
      </select>
    </div>
  );
};
