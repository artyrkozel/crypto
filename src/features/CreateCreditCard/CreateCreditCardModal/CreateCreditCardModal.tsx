import { Modal } from 'shared/ui/Modal';
import { FC } from 'react';
import { classNames } from 'helpers/classNames/classNames';
import { CreateCreditCard } from '../CreateCreditCard/CreateCreditCard';

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
