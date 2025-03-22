import { TableProps as AntTableProps, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

export interface TableProps extends Omit<AntTableProps, 'onChange' | 'heigth'> {
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: TableSortProps,
    extra: TableCurrentDataSource<any>
  ) => void;
  heigth?: number | string;
}

export interface TableSortProps {
  origin: SorterResult<any> | SorterResult<any>[];
  converted: string[] | undefined;
}
