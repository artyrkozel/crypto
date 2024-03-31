import Cookies from 'js-cookie';

export const setCookies = ({
  accessToken,
  expires = 1,
}: {
    accessToken: string;
    expires?: number;
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
