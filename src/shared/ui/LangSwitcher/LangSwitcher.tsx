import { classNames } from 'helpers/classNames/classNames';
import styles from './LangSwitcher.module.scss';
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
		<Button
			className={classNames(styles.LangSwitcher, {}, [clasNames || ''])}
			onClick={fdf}
		>
			{t('EN')}
		</Button>
	);
};
