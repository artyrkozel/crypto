import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end' | 'normal';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
};

const alignClasses: Record<FlexAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  normal: styles.normal,
};

const directionClasses: Record<FlexDirection, string> = {
  row: styles.directionRow,
  column: styles.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: styles.gap4,
  8: styles.gap8,
  16: styles.gap16,
  32: styles.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
    ...otherProps
  } = props;

  const classes: string[] = [
    className || '',
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    (gap && gapClasses[gap]) || '',
  ];

  const mods: Mods = {
    [styles.max]: !!max,
  };

  return (
    <div className={classNames(styles.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
