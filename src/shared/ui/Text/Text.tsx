import { memo } from 'react';
import cls from './Text.module.scss';
import { Mods, classNames } from '@/helpers/classNames/classNames';

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextColor {
  primary = 'primary',
  secondary = 'secondary',
  grey = 'grey',
}

export enum TextSize {
  XS = 'size_xs',
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  classNameText?: string;
  title?: string;
  text?: string;
  uppercase?: boolean;
  align?: TextAlign;
  size?: TextSize;
  color?: TextColor;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.XS]: 'h4',
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    classNameText,
    text,
    title,
    align = TextAlign.LEFT,
    size = TextSize.M,
    color = TextColor.primary,
    uppercase = false,
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: Mods = {
    [cls[align]]: true,
    [cls[size]]: true,
    [cls[color]]: true,
    [cls[uppercase ? 'uppercase' : '']]: !!uppercase,
  };

  return (
    <div className={classNames(cls.Text, mods, [className || ''])}>
      {title && (
        <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={classNames(cls.text, {}, [classNameText || ''])}
          data-testid={`${dataTestId}.Paragraph`}
        >
          {text}
        </p>
      )}
    </div>
  );
});
