import { FC, memo } from 'react';
import { classNames, Mods } from 'helpers/classNames/classNames';
import { Text, TextAlign, TextSize } from 'shared/ui/Text';
import styles from './ChangePrice.module.scss';

interface ChangePriceProps {
  className?: string;
  changeValue: number;
}

export const ChangePrice: FC<ChangePriceProps> = memo(
  ({ className, changeValue }) => {
    const mods: Mods = {
      [styles.green]: Boolean(+changeValue > 0),
      [styles.red]: Boolean(+changeValue < 0),
    };

    return (
      <Text
        align={TextAlign.CENTER}
        text={`${changeValue} %`}
        className={classNames(styles.ChangePrice, mods, [className || ''])}
        size={TextSize.XS}
      />
    );
  },
);
