import { FC, ReactNode } from 'react';
import { useModal } from 'shared/lib/hooks/useModal';
import { Mods, classNames } from 'helpers/classNames/classNames';
import styles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}) => {
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [styles.opened]: !!isOpen,
    [styles.isClosing]: !!isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(styles.Modal, mods, [
          className || '',
          'app_modal',
        ])}
      >
        <div style={{ backgroundColor: 'red' }} onClick={close}>close</div>
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
};
