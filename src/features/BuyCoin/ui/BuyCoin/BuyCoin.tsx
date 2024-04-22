import { ControlWrapperForm } from 'shared/ui/ControlWrapperForm/ControlWrapperForm';
import Input from 'shared/ui/Input/Input';
import { HStack, VStack } from 'shared/ui/Stack';
import { FormProvider, useForm } from 'react-hook-form';
import { Dropdown, IOptions } from 'shared/ui/Dropdown/Dropdown';
import Button from 'shared/ui/Button/Button';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinsOptions } from 'entities/Coin/model/selectors/getCoinsOptions/getCoinsOptions';
import { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { ICoin } from 'entities/Coin/model/types/coin';
import { coinActions } from 'entities/Coin/model/slice/slice';
import { getAmountWithCommision } from 'shared/lib/utils';
import { useCreateTransactionMutation } from 'entities/Transaction/model/api/api';
import { TransactionFactory } from 'shared/lib/factories/TransactionFactory';
import { getUserAuthData } from 'entities/user';
import { COMMISION } from 'shared/lib/consts';
import { NotificationFactory } from 'shared/lib/factories/NotificationFactory';
import { useCreateNotificationMutation } from 'entities/Notification/model/api/api';
import { useUpdateWalletMutation } from 'entities/Wallet/api/api';
import { getWalletData } from 'entities/Wallet/model/selectors';
import { IWalletCurrency } from 'entities/Wallet/model/types';
import { WalletFactory } from 'shared/lib/factories/WalletFactory';
import styles from './BuyCoin.module.scss';

export interface IBuyCoinFields {
  priceFrom: string;
  priceTo: string;
  fromCurrenency: IOptions | null;
  toCurrenency: IOptions | null;
}

interface IBuyCoin {
  coinData: ICoin | undefined;
}

// const BuyCoinSchema = yup.object().shape({
//   priceFrom: priceValidation,
//   priceTo: priceValidation,
//   fromCurrenency: selectObjectValidation,
//   toCurrenency: selectObjectValidation,
// });

export const BuyCoin: FC<IBuyCoin> = ({ coinData }) => {
  const dispath = useDispatch();
  const coinsOptions = useSelector(getCoinsOptions);
  const user = useSelector(getUserAuthData);
  const walletData = useSelector(getWalletData);

  const methods = useForm<IBuyCoinFields>({
    mode: 'onChange',
    // resolver: yupResolver(BuyCoinSchema),
    defaultValues: {
      priceFrom: '',
      priceTo: '',
      fromCurrenency: null,
      toCurrenency: null,
    },
  });

  const [createTransaction] = useCreateTransactionMutation();
  const [createNotify] = useCreateNotificationMutation();
  const [walletUpdate] = useUpdateWalletMutation();

  const { register, handleSubmit, setValue, watch } = methods;

  const priceFrom = watch('priceFrom');

  const onSubmit = async (data: IBuyCoinFields) => {
    if (coinData && walletData) {
      const isCurrentCoinIndex = walletData.currencies.findIndex(
        (currency) => currency.name === coinData.name,
      );
      const totalSum = getAmountWithCommision(
        Number(data.priceFrom),
        COMMISION,
      );
      let walletCurrencyUpdate: IWalletCurrency[] | null = null;

      if (isCurrentCoinIndex > -1) {
        const currencyListUpadte = walletData.currencies.map((el, index) => (index === isCurrentCoinIndex
          ? {
            ...el,
            value:
                  Number(walletData.currencies[isCurrentCoinIndex].value)
                  + Number(data.priceTo),
          }
          : el));
        walletCurrencyUpdate = currencyListUpadte;
      } else {
        const newCurrency = WalletFactory.getNewCurrency(coinData, +totalSum);
        const newCurrencys = [...walletData.currencies, newCurrency];
        walletCurrencyUpdate = newCurrencys;
      }

      const walletUpdateData = WalletFactory.getWalletUpdate(
        walletCurrencyUpdate,
        walletData,
      );

      const transaction = TransactionFactory.createTransaction(
        data,
        coinData,
        String(user?.id),
      );

      const resultTransation = await createTransaction(transaction).unwrap();

      const resultWallet = await walletUpdate({
        walletId: Number(walletData?.id),
        walletUpdate: walletUpdateData,
      }).unwrap();

      const notification = NotificationFactory.createNotification(
        coinData,
        String(user?.id),
        totalSum,
      );

      const resultNotify = await createNotify(notification);

      if (resultNotify && resultWallet && resultTransation) {
        setValue('priceFrom', '');
        setValue('priceTo', '');
      }
    }

    return data;
  };

  useEffect(() => {
    if (coinData) {
      const seletedCoin: IOptions = {
        label: coinData.name,
        value: coinData.uuid,
        icon: coinData.iconUrl,
      };
      setValue('toCurrenency', seletedCoin);
    }
  }, [coinData, setValue]);

  useEffect(() => {
    const fromCurrenencyOptions: IOptions = {
      value: 'USD',
      label: 'USD',
    };

    setValue('fromCurrenency', fromCurrenencyOptions);
  }, [setValue]);

  const onChange = useCallback(
    (opiton: IOptions | null) => {
      if (opiton) {
        dispath(coinActions.setTradeCoinId(opiton.value));
        setValue('priceFrom', '');
        setValue('priceTo', '');
      }
    },
    [dispath, setValue],
  );

  const onChangePriceFrom = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.value && coinData) {
        const priceTo = Number(e.currentTarget.value) * Number(coinData.price);
        setValue('priceTo', priceTo.toFixed(5));
      }
    },
    [coinData, setValue],
  );

  const onChangePriceTo = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.value && coinData) {
        const priceTo = Number(e.currentTarget.value) * Number(coinData.price);
        setValue('priceFrom', priceTo.toFixed(5).toString());
      }
    },
    [coinData, setValue],
  );

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <HStack align='end' gap='8' style={{ marginBottom: 16 }}>
          <ControlWrapperForm name='priceFrom'>
            <Input
              placeholder='0'
              autoFocus
              {...register('priceFrom')}
              label='From'
              onChangeInput={onChangePriceFrom}
              type='number'
            />
          </ControlWrapperForm>
          <ControlWrapperForm name='fromCurrenency'>
            <Dropdown options={[]} showCleanBtn={false} disabled />
          </ControlWrapperForm>
        </HStack>
        <HStack align='end' gap='8'>
          <ControlWrapperForm name='priceTo'>
            <Input
              placeholder='0'
              autoFocus
              {...register('priceTo')}
              label='To'
              type='number'
              onChangeInput={onChangePriceTo}
            />
          </ControlWrapperForm>
          <ControlWrapperForm name='toCurrenency'>
            <Dropdown
              options={coinsOptions}
              showCleanBtn={false}
              onChaggeValue={onChange}
            />
          </ControlWrapperForm>
        </HStack>

        <VStack className={styles.exchange_info} gap='8'>
          <HStack justify='between' className={styles.fee}>
            <Text text='Commision:' color={TextColor.grey} size={TextSize.XS} />
            <Text
              text={`${COMMISION} %`}
              color={TextColor.secondary}
              size={TextSize.XS}
            />
          </HStack>
          <HStack justify='between' className={styles.amount}>
            <Text
              text='Amount with commision:'
              color={TextColor.grey}
              size={TextSize.XS}
            />
            <Text
              text={`${getAmountWithCommision(Number(priceFrom), COMMISION)}`}
              color={TextColor.secondary}
              size={TextSize.XS}
            />
          </HStack>
        </VStack>
        <Text
          text='Justo donec enim diam vulputate ut pharetra. Ut placerat orci nulla pellen. Nulla pellentesque dignissim eni'
          color={TextColor.grey}
          size={TextSize.XS}
          className={styles.description}
        />
        <Button type='submit' variant='secondary' fullWidth>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
