import { Row, flexRender } from '@tanstack/react-table';
import { classNames } from 'helpers/classNames/classNames';
import { RefObject, useEffect, useRef } from 'react';
import useInViewPort from 'shared/lib/hooks/useInViewPort';
import styles from '../../Table.module.scss';

interface ITableHeaderProps<T extends object> {
  getRowModel: () => { rows: Row<T>[] };
  onClickHanlder?: (rowItem: T) => void;
  viewportHanlder?: (value: boolean) => void;
}

export const TableBody = <T extends object>({
  getRowModel,
  onClickHanlder,
  viewportHanlder,
}: ITableHeaderProps<T>) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { inViewport } = useInViewPort(ref, { threshold: 0.3 });

  useEffect(() => {
    if (viewportHanlder) {
      viewportHanlder(inViewport);
    }
  }, [viewportHanlder, inViewport]);

  return (
    <tbody className={classNames('', {}, [])}>
      {getRowModel().rows.map((row) => {
        return (
          <>
            <tr
              key={row.id}
              className={styles.rowWrapper}
              onClick={() => onClickHanlder && onClickHanlder(row.original)}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
            <div className={styles.spacer} style={{ display: 'block' }} />
          </>
        );
      })}
      <div className={styles.divider} ref={ref} />
    </tbody>
  );
};
