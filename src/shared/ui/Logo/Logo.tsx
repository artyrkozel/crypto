import { Link } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { FC } from 'react';
import logo from '../../../assets/Logo.png';
import logoMini from '../../../assets/logo-mini.png';

interface ILogo {
  collapsed: boolean;
}

export const Logo: FC<ILogo> = ({ collapsed }) => {
  return (
    <Link to={AppRoutes.MAIN}>
      {collapsed ? (
        <img src={logoMini} alt='logo' />
      ) : (
        <img src={logo} alt='logo' />
      )}
    </Link>
  );
};
