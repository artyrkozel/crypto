import { classNames } from 'helpers/classNames/classNames';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface ILangSwitcherProps {
	clasNames?: string;
}

export const LangSwitcher = ({ clasNames }: ILangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const fdf = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button className={classNames('', {}, [clasNames || ''])} onClick={fdf}>
			{t('EN')}
		</Button>
	);
};
