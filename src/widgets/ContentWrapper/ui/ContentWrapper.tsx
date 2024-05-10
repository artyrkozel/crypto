import { Mods, classNames } from '@/helpers/classNames/classNames';
import { FC, ReactNode, memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { CardTheme } from '@/shared/ui/Card/ui/Card';
import { HStack } from '@/shared/ui/Stack';
import Button from '@/shared/ui/Button/Button';
import styles from './ContentWrapper.module.scss';

interface IContentWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  theme?: CardTheme;
  overflow?: boolean;
  fill?: boolean;
  onClick?: () => void;
  textButton?: string;
}

export const ContentWrapper: FC<IContentWrapperProps> = memo(
  ({
    children,
    className,
    theme,
    title,
    overflow = false,
    fill = false,
    onClick,
    textButton = 'create',
  }) => {
    const mods: Mods = {
      [styles.contained]: fill,
    };

    return (
      <div className={classNames(styles.ContentWrapper, mods, [className])}>
        <HStack justify='between' align='center'>
          {title && <Text className={styles.title} title={title} />}
          {onClick && <Button onClick={onClick}>{textButton}</Button>}
        </HStack>
        <Card theme={theme} overflowY={overflow}>
          {children}
        </Card>
      </div>
    );
  },
);
