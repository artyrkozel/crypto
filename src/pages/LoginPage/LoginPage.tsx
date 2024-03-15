import styles from './Login.module.scss';

const LoginPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>
				<div className={styles.logo}>VALUET</div>
				<div className={styles.divider} />
				<div className={styles.logoText}>Your currency dashboard</div>
			</div>
		</div>
	);
};

export default LoginPage;
