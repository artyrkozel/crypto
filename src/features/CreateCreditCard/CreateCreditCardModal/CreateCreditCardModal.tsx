import { FC } from 'react';
import { CreateCreditCard } from '../CreateCreditCard/CreateCreditCard';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/helpers/classNames/classNames';

interface ICreateCreditCardModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCreditCardModal: FC<ICreateCreditCardModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateCreditCard onCloseModal={onClose} />
    </Modal>
  );
};
