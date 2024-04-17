import { FC, memo } from 'react';
import referal from '../../../../assets/referal-banner.webp';
import { Banner } from '../Banner';

interface ChangePriceProps {
  className?: string;
}

export const ReferalBanner: FC<ChangePriceProps> = memo(({ className }) => {
  return (
    <div className={className}>
      <Banner
        img={referal}
        title='Get 100 USDT Cashback Voucher'
        text='When Inbitee accumulatively deposits more than $50.'
      />
    </div>
  );
});
