import IMask from 'imask';

export const businessCardMask = '#### 0000 0000 ####';

const maskCreditCard = IMask.createMask({
  mask: businessCardMask,
  definitions: {
    X: {
      mask: '0',
      displayChar: 'X',
      placeholderChar: '#',
    },
  },
  lazy: false,
  overwrite: 'shift',
});

export const crediCardMasked = (creditNumber: string) => IMask.pipe(creditNumber, maskCreditCard);
