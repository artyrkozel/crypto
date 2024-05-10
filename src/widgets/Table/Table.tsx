import { useCallback, useState } from 'react';
import {
  AccessorKeyColumnDef,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './Table.module.scss';
import { TableHeader } from './ui/TableHeader/TableHeader';
import { TableBody } from './ui/TableBody/TableBody';
import { Mods, classNames } from '@/helpers/classNames/classNames';

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
  const [inOverview, setInOverview] = useState(false);

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

  const mods: Mods = {
    [styles.bg_view]: !inOverview,
  };

  const viewportHanlder = useCallback(
    (value: boolean) => {
      setInOverview(value);
    },
    [setInOverview],
  );

  return (
    <div className={classNames(styles.TableContainer, mods, [])}>
      <table className={classNames(styles.Table, {}, [className || ''])}>
        <TableHeader getHeaderGroups={table.getHeaderGroups()} />
        <TableBody
          getRowModel={table.getRowModel}
          onClickHanlder={onClickHanlder}
          viewportHanlder={viewportHanlder}
        />
      </table>
    </div>
  );
};
