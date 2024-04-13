import { FC, useState } from 'react';
import Button from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal';
import { BuyCoinModal } from '../BuyCoinModal/BuyCoinModal';

interface IBuyCoinButtonProps {
  type: 'buy' | 'sell';
}

export const BuyCoinButton: FC<IBuyCoinButtonProps> = ({ type }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      <Button onClick={() => setShowModal(true)} variant='primary' fullWidth>
        {type}
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <BuyCoinModal onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};
