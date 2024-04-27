import { FC, ReactNode } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import styles from './FormControl.module.scss';

interface IFormControl {
  label?: string;
  className?: string;
  errorMessage?: string;
  name?: string;
  children: ReactNode;
}

export const FormControl: FC<IFormControl> = ({
  children,
  className,
  label,
  errorMessage,
  name,
}) => {
  return (
    <div className={classNames(styles.FormControl, {}, [className])}>
      {label && (
        <label className={styles.lable} htmlFor={name}>
          {label}
        </label>
      )}
      {children}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};
