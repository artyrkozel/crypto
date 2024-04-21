import {
  AccessorKeyColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { ICoin } from 'entities/Coin/model/types/coin';
import { FC, useCallback, useMemo } from 'react';
import { numMask, round } from 'shared/lib/numbers';
import { HStack, VStack } from 'shared/ui/Stack';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { ChangePrice } from 'widgets/ChangePrice';
import { Table } from 'widgets/Table/Table';
import { classNames } from 'helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { coinActions } from 'entities/Coin/model/slice/slice';
import styles from './CoinsList.module.scss';

interface ITradeCoinsList {
  coinsList: ICoin[] | undefined;
}
/* eslint-disable */
export const TradeCoinsList: FC<ITradeCoinsList> = ({ coinsList }) => {
  const columnHelper = createColumnHelper<ICoin>();
  const { t } = useTranslation();
  const dispath = useDispatch();

  const columns: AccessorKeyColumnDef<ICoin, string>[] = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'Name',
        header: 'Name',
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
    [coinsList, columnHelper],
  );

  const onClickHanlder = useCallback(
    (row: ICoin) => {
      dispath(coinActions.setTradeCoinId(row.uuid));
      // dispath(coinActions.setCoinToBuy(row));
    },
    [dispath],
  );

  if (!coinsList || !coinsList.length) {
    return (
      <div className={classNames('', {}, [])}>
        <Text size={TextSize.L} title={t('No result')} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper_list}>
      <div className={styles.coins_table}>
        <Table
          data={coinsList}
          columns={columns}
          onClickHanlder={onClickHanlder}
        />
      </div>
    </div>
  );
};
