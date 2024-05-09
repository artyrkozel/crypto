import Cookies from 'js-cookie';
import { IOptions } from 'shared/ui/Dropdown/Dropdown';

export const setCookies = ({
  accessToken,
  expires = 1,
}: {
    accessToken: string;
    expires?: number | Date;
  }) => {
  Cookies.set('accessToken', accessToken, { expires });
};

export const removeCookies = () => {
  Cookies.remove('accessToken');
};

export const getCookies = (name: string) => Cookies.get(name);

export const getLocalStorage = (value: string): string | null => {
  const userId = localStorage.getItem(value);
  return userId ? JSON.parse(userId) : null;
};

export const generateDepositTest = (
  type: 'withdraw' | 'deposit',
  sum: number,
  coinName: string,
) => {
  let message = '';
  if (type === 'deposit') {
    message = `You have successful deposit ${sum} ${coinName} to your account.
    Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt
    ornare. Justo donec enim diam vulputate ut pharetra. Ut placerat orci
    nulla pellentesque dignissim`;
  }
  return message;
};

export const getAmountWithCommision = (amount: number, commisionPercent: number) => {
  if (amount && amount > 0) {
    const commision = Number(amount) * (commisionPercent / 100);
    return commision + amount;
  }
  return 0;
};

export const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? `0${month}` : month;
});

export const monthOptions: IOptions[] = monthsArr.map((el) => {
  const opt = { label: String(el), value: String(el) };
  return opt;
});

export const yearsArr: IOptions[] = Array.from({ length: 9 }, (_, i) => ({
  label: String(new Date().getFullYear() + i),
  value: String(new Date().getFullYear() + i),
}));
