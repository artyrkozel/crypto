import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { classNames } from '@/helpers/classNames/classNames';

interface ILangSwitcherProps {
  clasNames?: string;
}

export const LangSwitcher = ({ clasNames }: ILangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const fdf = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button variant='primary' className={classNames('', {}, [clasNames || ''])} onClick={fdf}>
      {t('EN')}
    </Button>
  );
};
