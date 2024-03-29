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