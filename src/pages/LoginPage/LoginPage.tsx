import styles from './Login.module.scss';
import LoginLogo from '../../assets/login-logo.png';
import { LoginForm } from '@/features/AuthByEmail';
import { Text, TextAlign } from '@/shared/ui/Text';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.leftContentWrapper}>
          <div>
            <img alt='logo' src={LoginLogo} />
          </div>
          <Text
            title='Buy & Sell Each Digital Cryptocurrency and Arts'
            align={TextAlign.CENTER}
            className={styles.title}
          />
          <Text
            text='Easily buy Bitcoin and other cryptocurrencies using a wide range of payment options.
              Discover exclusive digital collectibles using InCrypto today'
            align={TextAlign.CENTER}
          />
        </div>
      </div>
      <div className={styles.rightContent}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
