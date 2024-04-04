import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from 'helpers/classNames/classNames';
import styles from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  max?: boolean;
}

export const Card = memo((props: CardProps) => {
  const { className, children, max, theme = CardTheme.OUTLINED, ...otherProps } = props;

  const mods: Mods = {
    [styles.max]: !!max,
  };

  return (
    <div
      className={classNames(styles.Card, mods, [className || '', styles[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
