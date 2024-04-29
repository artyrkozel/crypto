import { Page } from 'widgets/Page/Page';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import React, { useState } from 'react';
import { CreditCard } from 'widgets/CreditCard';
import { ICreditCard } from 'widgets/CreditCard/ui/CreditCard';
import { CreateCreditCardModal } from 'features/CreateCreditCard';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { classNames } from 'helpers/classNames/classNames';
import styles from './ActionsPage.module.scss';

interface ICardItem {
  key: number;
  content: React.ReactNode;
}

const card: ICreditCard[] = [
  {
    id: 1,
    cardHolder: 'Artur Kozel',
    expires: '23/23',
    cardNumber: '1111 1111 3333 3333',
  },
  {
    id: 2,
    cardHolder: 'Ibra',
    expires: '23/23',
    cardNumber: '2222 2222 3333 3333',
  },
  {
    id: 3,
    cardHolder: 'ronney',
    expires: '23/23',
    cardNumber: '3333 3333 3333 3333',
  },
  {
    id: 4,
    cardHolder: 'nooooooooo',
    expires: '23/23',
    cardNumber: '4444 4444 3333 3333',
  },
];

const cards1: ICardItem[] = [
  {
    key: 1,
    content: <CreditCard card={card[0]} />,
  },
  {
    key: 2,
    content: <CreditCard card={card[1]} />,
  },
  {
    key: 3,
    content: <CreditCard card={card[2]} />,
  },
  {
    key: 4,
    content: <CreditCard card={card[3]} />,
  },
];

const ActionsPage = () => {
  const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);

  const table = cards1.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });
  const [cards] = useState(table);

  const [creditCardModal, setCreditCardModal] = useState<boolean>(false);

  return (
    <Page pageTitle='Actions'>
      <div className={classNames(styles.ActionsPage)}>
        <ContentWrapper
          title='Credit'
          className={classNames(styles.CreditCards, {}, [])}
          onClick={() => setCreditCardModal(true)}
        >
          <div
            style={{ height: 200 }}
            className={styles.creditsCards_list}
          >
            <Carousel
              slides={cards}
              goToSlide={goToSlide}
              offsetRadius={2}
              showNavigation
              animationConfig={config.gentle}
            />
          </div>
          <CreateCreditCardModal
            isOpen={creditCardModal}
            onClose={() => setCreditCardModal(false)}
          />
        </ContentWrapper>
        <div style={{ gridArea: 'withdraw', border: '1px solid #000' }}>
          withdraw
        </div>
        <div style={{ gridArea: 'exchange', border: '1px solid #000' }}>
          exchange
        </div>
        <div style={{ gridArea: 'deposit', border: '1px solid #000' }}>
          deposit
        </div>
        <div style={{ gridArea: 'staking', border: '1px solid #000' }}>
          staking
        </div>
        <div style={{ gridArea: 'check_aml', border: '1px solid #000' }}>
          staking
        </div>
      </div>
    </Page>
  );
};

export default ActionsPage;
