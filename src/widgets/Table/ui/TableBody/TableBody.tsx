import { Row, flexRender } from '@tanstack/react-table';
import styles from '../../Table.module.scss';

interface ITableHeaderProps<T extends object> {
  getRowModel: () => { rows: Row<T>[] };
  onClickHanlder?: (rowItem: T) => void;
}

export const TableBody = <T extends object>({
  getRowModel,
  onClickHanlder,
}: ITableHeaderProps<T>) => {
  return (
    <tbody>
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
                  <td>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
            <div className={styles.spacer} />
          </>
        );
      })}
    </tbody>
  );
};
