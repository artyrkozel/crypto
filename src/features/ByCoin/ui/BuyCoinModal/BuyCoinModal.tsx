import { getCoinToBuy } from 'entities/Coin/model/selectors/getCoinToBuy/getCoinToBuy';
import { FC, useEffect, useMemo } from 'react';
import { VscClose } from 'react-icons/vsc';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from 'shared/ui/Button/Button';
import { ControlWrapperForm } from 'shared/ui/ControlWrapperForm/ControlWrapperForm';
import { Dropdown } from 'shared/ui/Dropdown';
import Input from 'shared/ui/Input/Input';
import { HStack } from 'shared/ui/Stack';
import { IOptions } from 'shared/ui/Dropdown/Dropdown';
import { useUpdateWalletMutation } from 'entities/Wallet/api/api';
import { getWalletData } from 'entities/Wallet/model/selectors';
import { IWalletCurrency } from 'entities/Wallet/model/types';
import { WalletFactory } from 'shared/lib/factories/WalletFactory';
import { useCreateNotificationMutation } from 'entities/Notification/model/api/api';
import { NotificationFactory } from 'shared/lib/factories/NotificationFactory';

interface IBuyCoinModal {
  onClose: () => void;
}

export interface IFormBuyCoin {
  fromSumm: string;
  toSum: string;
  fromCurrenency: IOptions | null;
  toCurrenency: IOptions | null;
}

export const BuyCoinModal: FC<IBuyCoinModal> = ({ onClose }) => {
  const coinToTrade = useSelector(getCoinToBuy);
  const walletData = useSelector(getWalletData);

  const [update] = useUpdateWalletMutation();
  const [createNotify] = useCreateNotificationMutation();

  const methods = useForm<IFormBuyCoin>({
    mode: 'onChange',
    defaultValues: {
      fromSumm: '',
      toSum: '',
      fromCurrenency: null,
      toCurrenency: null,
    },
  });

  const { register, handleSubmit, setValue } = methods;

  const orderOptions = useMemo<IOptions[]>(
    () => [
      {
        value: coinToTrade?.name ?? '',
        label: coinToTrade?.name ?? '',
        icon: coinToTrade?.iconUrl ?? '',
      },
      {
        value: 'USD',
        label: 'USD',
      },
    ],
    [coinToTrade],
  );

  useEffect(() => {
    if (coinToTrade) {
      const { name, iconUrl } = coinToTrade;
      setValue('toCurrenency', {
        value: name,
        label: name,
        icon: iconUrl,
      });
      setValue('fromCurrenency', {
        value: 'USD',
        label: 'USD',
      });
    }
  }, [coinToTrade, setValue]);

  const onSubmit = async (data: IFormBuyCoin) => {
    if (walletData && coinToTrade) {
      const isCurrentCoinIndex = walletData.currencies.findIndex(
        (currency) => currency.name === coinToTrade.name,
      );

      let walletCurrencyUpdate: IWalletCurrency[] | null = null;

      if (isCurrentCoinIndex > -1) {
        const currencyListUpadte = walletData.currencies.map((el, index) => (index === isCurrentCoinIndex
          ? {
            ...el,
            value:
                  Number(walletData.currencies[isCurrentCoinIndex].value)
                  + Number(data.toSum),
          }
          : el));
        walletCurrencyUpdate = currencyListUpadte;
      } else {
        const newCurrency = WalletFactory.getNewCurrency(
          coinToTrade,
          +data.toSum,
        );
        const newCurrencys = [...walletData.currencies, newCurrency];
        walletCurrencyUpdate = newCurrencys;
      }

      const walletUpdateData = WalletFactory.getWalletUpdate(
        walletCurrencyUpdate,
        walletData,
      );

      const resultWallet = await update({
        walletId: Number(walletData?.id),
        walletUpdate: walletUpdateData,
      }).unwrap();

      const notification = NotificationFactory.createNotification(
        coinToTrade,
        walletUpdateData.userId,
        +data.toSum,
      );

      const resultNotify = await createNotify(notification).unwrap();

      if (resultWallet && resultNotify) {
        onClose();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: 450, height: 450, backgroundColor: '#fff' }}>
          <HStack justify='end'>
            <VscClose
              fill='#b8b8b8'
              onClick={onClose}
              style={{ display: 'block', cursor: 'pointer' }}
            />
          </HStack>
          <HStack align='end' gap='8' style={{ marginBottom: 16 }}>
            <ControlWrapperForm name='fromSumm'>
              <Input
                placeholder='0'
                autoFocus
                {...register('fromSumm')}
                label='I give'
              />
            </ControlWrapperForm>
            <ControlWrapperForm name='fromCurrenency'>
              <Dropdown options={orderOptions} showCleanBtn={false} disabled />
            </ControlWrapperForm>
          </HStack>
          <HStack align='end' gap='8'>
            <ControlWrapperForm name='toSum'>
              <Input
                placeholder='0'
                autoFocus
                {...register('toSum')}
                label='I receive'
              />
            </ControlWrapperForm>
            <ControlWrapperForm name='toCurrenency'>
              <Dropdown options={orderOptions} showCleanBtn={false} />
            </ControlWrapperForm>
          </HStack>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
