import { useState } from 'react';
import {
  AccessorKeyColumnDef,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { classNames } from 'helpers/classNames/classNames';
import styles from './Table.module.scss';
import { TableHeader } from './ui/TableHeader/TableHeader';
import { TableBody } from './ui/TableBody/TableBody';

interface ITable<T extends object> {
  onSortHandler?: (param: SortingState) => void;
  onClickHanlder?: (row: T) => void;
  data: T[];
  columns: AccessorKeyColumnDef<T, string>[];
  className?: string;
}

export const Table = <T extends object>({
  data = [],
  columns,
  onSortHandler,
  onClickHanlder,
  className,
}: ITable<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: (updater) => {
      const newSortingValue = updater instanceof Function ? updater(sorting) : updater;
      onSortHandler && onSortHandler(newSortingValue);
      setSorting(updater);
    },
  });

  return (
    <div className={styles.TableContainer}>
      <table className={classNames(styles.Table, {}, [className || ''])}>
        <TableHeader getHeaderGroups={table.getHeaderGroups()} />
        <TableBody
          getRowModel={table.getRowModel}
          onClickHanlder={onClickHanlder}
        />
      </table>
    </div>
  );
};
