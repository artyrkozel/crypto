import { Page } from 'widgets/Page/Page';
import { classNames } from 'helpers/classNames/classNames';
import styles from './ActionsPage.module.scss';
import { CreditCards } from '../CreditCards/CreditCards';

const ActionsPage = () => {
  return (
    <Page pageTitle='Actions'>
      <div className={classNames(styles.ActionsPage)}>
        <CreditCards />
        <div
          style={{
            gridArea: 'withdraw',
            border: '1px solid #000',
            minHeight: 400,
          }}
        >
          withdraw
        </div>
        <div style={{ gridArea: 'exchange', border: '1px solid #000' }}>
          exchange
        </div>
        <div style={{ gridArea: 'deposit', border: '1px solid #000' }}>
          deposit
        </div>
        <div style={{ gridArea: 'staking', border: '1px solid #000' }}>
          staking
        </div>
        <div style={{ gridArea: 'check_aml', border: '1px solid #000' }}>
          staking
        </div>
      </div>
    </Page>
  );
};

export default ActionsPage;
