import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';
import { classNames } from '@/helpers/classNames/classNames';
import Button from '@/shared/ui/Button/Button';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('notFound');

  return (
    <div className={classNames(styles.NotFoundPage, {}, [])}>
      <div className={styles.textWrapper}>
        <span>404</span>
        <p>{t('Page Not Found')}</p>
        <Button variant="primary" onClick={() => navigate(AppRoutes.MAIN)}>
          {t('Go home')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
