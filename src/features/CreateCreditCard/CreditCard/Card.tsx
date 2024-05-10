import {
  useState,
  useEffect,
  MutableRefObject,
  RefObject,
  FC,
  CSSProperties,
} from 'react';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';
import { useFormContext } from 'react-hook-form';
import { IFormFieldsRefObj } from '../model/types';
import visaLabel from '../../../shared/assets/img/visa-label.png';
import chip from '../../../shared/assets/img/chip.png';
import { creditMask } from '@/shared/lib/icons';
import './Cards.scss';

interface ICardProps {
  currentFocusedElm: MutableRefObject<
    HTMLInputElement | HTMLSelectElement
  > | null;
  onCardElementClick: (key: keyof IFormFieldsRefObj) => void;
  cardNumberRef: RefObject<HTMLInputElement>;
  cardHolderRef: RefObject<HTMLInputElement>;
  cardDateRef: RefObject<HTMLSelectElement | HTMLDivElement>;
}

const Card: FC<ICardProps> = ({
  currentFocusedElm,
  onCardElementClick,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
}) => {
  const [style, setStyle] = useState<CSSProperties | undefined>(undefined);
  const { watch } = useFormContext();

  const cardNumber = watch('cardNumber');
  const cardHolder: string = watch('cardHolder');
  const cardMonth = watch('cardMonth');
  const cardYear = watch('cardYear');
  const cardCvv: string = watch('cardCvv');
  const isCardFlipped = watch('isCardFlipped');
  const cardMask = watch('mask');

  const outlineElementStyle = (
    element: HTMLInputElement | HTMLSelectElement | null,
  ) => {
    return element
      ? {
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
        transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`,
      }
      : undefined;
  };

  useEffect(() => {
    if (currentFocusedElm) {
      const style = outlineElementStyle(currentFocusedElm.current);
      setStyle(style);
    }
  }, [currentFocusedElm]);

  const maskCardNumber = (cardNumber: string) => {
    const cardNumberArr = cardNumber.split('');
    cardNumberArr.forEach((_, index) => {
      if (index > 4 && index < 14) {
        if (cardNumberArr[index] !== ' ') {
          cardNumberArr[index] = '*';
        }
      }
    });

    return cardNumberArr;
  };

  return (
    <div className={`card-item ${isCardFlipped ? '-active' : ''}`}>
      <div className='card-item__side -front'>
        <div
          className={`card-item__focus ${currentFocusedElm ? `-active` : ``}`}
          style={style}
        />
        <img
          style={{ position: 'absolute', width: '100%' }}
          src={creditMask[cardMask]}
          alt='credit_mask'
        />
        <div className='card-item__wrapper'>
          <div className='card-item__top'>
            <img src={chip} alt='' className='card-item__chip' />
            <div className='card-item__type'>
              <img src={visaLabel} alt='visa' className='card-item__typeImg' />
            </div>
          </div>

          <div
            className='card-item__number'
            ref={cardNumberRef}
            onClick={() => onCardElementClick('cardNumber')}
          >
            <TransitionGroup className='slide-fade-up' component='div'>
              {cardNumber === ''
                ? maskCardNumber('#### **** **** ####').map((val, index) => (
                  <CSSTransition
                    classNames='slide-fade-up'
                    timeout={250}
                    key={index}
                  >
                    <div
                      style={{
                        width: 16,
                        display: 'inline-block',
                        fontSize: 27,
                      }}
                    >
                      {val}
                    </div>
                  </CSSTransition>
                ))
                : maskCardNumber(cardNumber).map((val, index) => (
                  <CSSTransition
                    classNames='slide-fade-up'
                    timeout={250}
                    key={index}
                  >
                    <div
                      style={{
                        width: 16,
                        display: 'inline-block',
                        fontSize: 27,
                      }}
                    >
                      {val}
                    </div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
          <div className='card-item__content'>
            <div
              className='card-item__info'
              onClick={() => onCardElementClick('cardHolder')}
              ref={cardHolderRef}
            >
              <div className='card-item__holder'>Card Holder</div>
              <div className='card-item__name'>
                <TransitionGroup component='div' className='slide-fade-up'>
                  {cardHolder === '' ? (
                    <CSSTransition classNames='slide-fade-up' timeout={250}>
                      <div>FULL NAME</div>
                    </CSSTransition>
                  ) : (
                    cardHolder
                    && cardHolder.split('').map((val, index: number) => (
                      <CSSTransition
                        timeout={250}
                        classNames='slide-fade-right'
                        key={index}
                      >
                        <span className='card-item__nameItem'>{val}</span>
                      </CSSTransition>
                    ))
                  )}
                </TransitionGroup>
              </div>
            </div>
            <div
              className='card-item__date'
              onClick={() => onCardElementClick('cardDate')}
              // @ts-ignore
              ref={cardDateRef}
            >
              <div className='card-item__dateTitle'>Expires</div>
              <div className='card-item__dateItem'>
                <SwitchTransition in-out>
                  <CSSTransition
                    classNames='slide-fade-up'
                    timeout={200}
                    key={cardMonth}
                  >
                    <span>
                      {!cardMonth ? 'MM' : cardMonth}
                      {' '}
                    </span>
                  </CSSTransition>
                </SwitchTransition>
              </div>
              /
              <label htmlFor='cardYear' className='card-item__dateItem'>
                <SwitchTransition out-in>
                  <CSSTransition
                    classNames='slide-fade-up'
                    timeout={250}
                    key={cardYear}
                  >
                    <span>
                      {!cardYear ? 'YY' : cardYear.toString().substr(-2)}
                    </span>
                  </CSSTransition>
                </SwitchTransition>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='card-item__side -back'>
        <div className='card-item__cover' />
        <div className='card-item__band' />
        <div className='card-item__cvv'>
          <div className='card-item__cvvTitle'>CVV</div>
          <div className='card-item__cvvBand'>
            <TransitionGroup>
              {cardCvv.split('').map((_, index: number) => (
                <CSSTransition
                  classNames='zoom-in-out'
                  key={index}
                  timeout={250}
                >
                  <span>*</span>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
