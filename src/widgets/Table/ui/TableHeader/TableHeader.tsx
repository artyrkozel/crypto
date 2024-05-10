import { HeaderGroup, flexRender } from '@tanstack/react-table';
import styles from '../../Table.module.scss';
import { SortIcon } from '@/widgets/SortIcon/SortIcon';

interface ITableHeaderProps<T extends object> {
  getHeaderGroups: HeaderGroup<T>[];
}

export const TableHeader = <T extends object>({
  getHeaderGroups,
}: ITableHeaderProps<T>) => {
  return (
    <thead>
      {getHeaderGroups.map((headerGroup) => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  style={{ width: `${header.getSize()}%` }}
                  id={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={styles.head}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: <SortIcon className={styles.sort_btn} asc />,
                    desc: <SortIcon className={styles.sort_btn} desc />,
                  }[header.column.getIsSorted() as string] ?? (
                    <SortIcon className={styles.sort_btn} />
                  )}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
};
