import { ICoin } from 'entities/Coin/model/types/coin';
import { classNames } from 'helpers/classNames/classNames';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { Table } from 'widgets/Table/Table';
import {
  AccessorKeyColumnDef,
  SortingState,
  createColumnHelper,
} from '@tanstack/react-table';
import { numMask, round } from 'shared/lib/numbers';
import { ChangePrice } from 'widgets/ChangePrice';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import { HStack, VStack } from 'shared/ui/Stack';
import { useDispatch } from 'react-redux';
import { dashboardPageActions } from 'pages/DashboardPage/model/slice/dashboardPageSlice';
import { ContentWrapper } from 'widgets/ContentWrapper';
import { coinActions } from 'entities/Coin/model/slice/slice';
import styles from './CoinsBuyList.module.scss';
import { CoinTrade } from '../CoinTrade/CoinTrade';

interface ICoinsBuyListTable {
  coins: ICoin[] | undefined;
  className?: string;
}
/* eslint-disable */
export const CoinsBuyList: FC<ICoinsBuyListTable> = ({ coins, className }) => {
  const { t } = useTranslation();
  const dispath = useDispatch();

  const sortHanler = (params: SortingState) => {
    if (!params.length) {
    }
    // const { id, desc } = params[0];
    // console.log(id);
    // console.log(desc);
  };

  const onClickHanlder = useCallback(
    (row: ICoin) => {
      dispath(dashboardPageActions.setTradeCoinId(row.uuid));
      dispath(coinActions.setCoinToBuy(row));
    },
    [dispath],
  );

  const columnHelper = createColumnHelper<ICoin>();

  const columns: AccessorKeyColumnDef<ICoin, string>[] = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'Name',
        header: 'Full Name',
        cell: ({ row }) => {
          return (
            <Flex direction='row' style={{ textAlign: 'left' }}>
              <HStack style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 40, display: 'block' }}>
                  <img
                    src={row.original.iconUrl}
                    alt={row.original.name}
                    style={{ width: 40, height: 40 }}
                  />
                </div>

                <VStack
                  style={{
                    marginLeft: 8,
                  }}
                >
                  <Text
                    text={row.original.name}
                    color={TextColor.secondary}
                    classNameText={styles.name}
                    size={TextSize.XS}
                  />
                  <Text
                    classNameText={styles.symbol}
                    text={row.original.symbol}
                    size={TextSize.XS}
                  />
                </VStack>
              </HStack>
            </Flex>
          );
        },
        size: 50,
        enableSorting: true,
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        enableSorting: true,
        size: 25,
        cell: ({ row }) => (
          <HStack>
            <Text
              className={styles.price}
              color={TextColor.secondary}
              text={`$ ${String(numMask(round(Number(row.original.price))))}`}
              size={TextSize.S}
            />
          </HStack>
        ),
      }),
      columnHelper.accessor('change', {
        header: 'Change 24h',
        enableSorting: true,
        size: 25,
        cell: ({ row }) => {
          return <ChangePrice changeValue={+row.original.change} />;
        },
      }),
    ],
    [coins],
  );

  useEffect(() => {
    if (coins && coins.length) {
      dispath(dashboardPageActions.setTradeCoinId(coins[0].uuid));
      dispath(coinActions.setCoinToBuy(coins[0]));
    }
  }, [coins]);

  if (!coins || !coins.length) {
    return (
      <div className={classNames('', {}, [className || ''])}>
        <Text size={TextSize.L} title={t('No result')} />
      </div>
    );
  }

  return (
    <ContentWrapper
      title='Buy Crypto'
      className={classNames(styles.CoinsBuyList, {}, [className || ''])}
    >
      <div
        className={classNames(styles.CoinsBuyList, {}, [className || ''])}
        data-testid='CoinsBuyList'
      >
        <div className={styles.coin_trade_data}>
          <CoinTrade />
        </div>
        <div className={styles.coin_trade_table}>
          <Table
            data={coins}
            columns={columns}
            onSortHandler={sortHanler}
            onClickHanlder={onClickHanlder}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
