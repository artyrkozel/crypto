import React, { useMemo } from 'react';
import { useUniqueId } from 'shared/lib/hooks/useUniqeId';
import { classNames } from 'helpers/classNames/classNames';
import styles from './ControlWrapper.module.scss';

export type ControlWrapperProps = {
  children:
    | React.JSXElementConstructor<{ hasError?: boolean; id?: string }>
    | React.ReactElement<{ hasError?: boolean; id?: string }>;
  getElementProps?: () => { hasError?: boolean; id?: string };
  error?: string;
  className?: string;
  headerClass?: string;
  label?: string | React.ReactNode;
};

export const ControlWrapper: React.FC<ControlWrapperProps> = React.forwardRef(
  ({
    children, error, className, label, headerClass, getElementProps,
  }) => {
    const wrapperClasses = classNames(styles.wrapper, {}, [className ?? '']);

    const headerClasses = classNames(styles.header, {}, [headerClass ?? '']);
    const id = useUniqueId('control');

    const localGetElementProps = useMemo(() => {
      return getElementProps ?? (() => ({ hasError: Boolean(error), id }));
    }, [getElementProps, error, id]);

    const childrenProps = useMemo(() => {
      return localGetElementProps();
    }, [localGetElementProps]);

    return (
      <div className={wrapperClasses}>
        {label && (
        <label htmlFor={childrenProps.id} className={headerClasses}>
          {label}
        </label>
        )}
        <div className={styles.content}>
          {React.cloneElement(
            children as React.FunctionComponentElement<{ hasError: boolean }>,
            childrenProps,
          )}

          {error && <span className={styles.error}>{error}</span>}
        </div>
      </div>
    );
  },
);
