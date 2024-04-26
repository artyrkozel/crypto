import React, { useState, useEffect, useMemo } from 'react';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';
import { useFormContext } from 'react-hook-form';
import visaLabel from "../../../shared/assets/img/visa-label.png";
import chip from '../../../shared/assets/img/chip.png';
import './Cards.scss';

/* eslint-disable */
/* tslint:disable */

const CARDS = {
  visa: '^4',
  amex: '^(34|37)',
  mastercard: '^5[1-5]',
  discover: '^6011',
  unionpay: '^62',
  troy: '^9792',
  diners: '^(30[0-5]|36)',
};

const cardBackgroundName = () => {
  const random = Math.floor(Math.random() * 25 + 1);
  return `${random}.jpeg`;
};

const BACKGROUND_IMG = cardBackgroundName();

const Card = ({
  isCardFlipped,
  currentFocusedElm,
  onCardElementClick,
  cardNumberRef,
  cardHolderRef,
  cardDateRef,
}: any) => {
  const [style, setStyle] = useState<any>(null);
  const { watch } = useFormContext();

  const cardNumber = watch('cardNumber');
  const cardHolder = watch('cardHolder');
  const cardMonth = watch('cardMonth');
  const cardYear = watch('cardYear');
  const cardCvv = watch('cardCvv');

  const cardType = (cardNumber: string) => {
    const number = cardNumber;
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return 'visa';
  };

  const useCardType = useMemo(() => {
    return cardType(cardNumber);
  }, [cardNumber]);

  const outlineElementStyle = (element: any) => {
    return element
      ? {
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
        transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`,
      }
      : null;
  };

  useEffect(() => {
    if (currentFocusedElm) {
      const style = outlineElementStyle(currentFocusedElm.current) as any;
      setStyle(style);
    }
  }, [currentFocusedElm]);

  const maskCardNumber = (cardNumber: string) => {
    const cardNumberArr = cardNumber.split('');
    cardNumberArr.forEach((val, index) => {
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
        <div className='card-item__cover' />

        <div className='card-item__wrapper'>
          <div className='card-item__top'>
            <img src={chip} alt='' className='card-item__chip' />
            <div className='card-item__type'>
              <img
                alt={useCardType}
                src={visaLabel}
                className='card-item__typeImg'
              />
            </div>
          </div>

          <label
            className='card-item__number'
            ref={cardNumberRef}
            onClick={() => onCardElementClick('cardNumber')}
          >
            <TransitionGroup className='slide-fade-up' component='div'>
              {cardNumber ? (
                maskCardNumber(cardNumber).map((val, index) => (
                  <CSSTransition
                    classNames='slide-fade-up'
                    timeout={250}
                    key={index}
                  >
                    <div className='card-item__numberItem'>{val}</div>
                  </CSSTransition>
                ))
              ) : (
                <CSSTransition classNames='slide-fade-up' timeout={250}>
                  <div className='card-item__numberItem'>#</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </label>
          <div className='card-item__content'>
            <label
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
                    && cardHolder.split('').map((val: any, index: number) => (
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
            </label>
            <div
              className='card-item__date'
              onClick={() => onCardElementClick('cardDate')}
              ref={cardDateRef}
            >
              <label className='card-item__dateTitle'>Expires</label>
              <label className='card-item__dateItem'>
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
              </label>
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
        <div className='card-item__cover'>
          <img
            alt=''
            src={`/card-background/${BACKGROUND_IMG}`}
            className='card-item__bg'
          />
        </div>
        <div className='card-item__band' />
        <div className='card-item__cvv'>
          <div className='card-item__cvvTitle'>CVV</div>
          <div className='card-item__cvvBand'>
            <TransitionGroup>
              {cardCvv.split('').map((val: any, index: number) => (
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
