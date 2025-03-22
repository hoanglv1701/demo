import React, { useMemo } from 'react';
import { Table as AntTable, Tooltip } from 'antd';
import classNames from 'classnames';
import './index.less';
import { TableProps, TableSortProps } from './type';
// import ElementLoader from '@/components/Business/ElementLoader';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/utilities/pagination';
import { getTableSort, getTableSortIcon } from '@/utilities/table';

export type { TableProps, TableSortProps };

const renderTotal = (total: number) => <span style={{ fontSize: '13px' }}>Tổng số: {total}</span>;

export const FlexTable: React.FC<TableProps> = ({ className, onChange, columns, pagination, heigth, ...rest }) => {
  const currentColumns: any = useMemo(() => {
    return columns?.map((item: any) => {
      return {
        render: (text: string) => <div style={{ textAlign: item.align }}>{text}</div>,
        ...item,
        width: 60,
        align: 'center', // Căn giữa tiêu đề
        sorter: item.sorter ? item.sorter : undefined,
        sortIcon: getTableSortIcon,
        title: (
          <Tooltip title={item.title}>
            <span>{item.title}</span>
          </Tooltip>
        ),
      };
    });
  }, [columns]);

  const rowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row'; // Chẵn là even, lẻ là odd
  };

  const handlerChangePagination = (page: number, size: number) => {
    if (pagination && pagination.onChange) {
      if (size !== pagination.pageSize) {
        pagination.onChange(1, size); // Reset về trang 1 khi thay đổi pageSize
      } else {
        pagination.onChange(page, size); // Chỉ thay đổi trang
      }
    }
  };

  return (
    <div className={`flex-1 overflow-auto `} style={{ maxHeight: heigth || 'auto' }}>
      <AntTable
        className={classNames('gt-flex-table', className)}
        rowClassName={rowClassName}
        rowKey='id'
        size='small'
        bordered
        sticky
        scroll={{ y: 100, x: 'max-content' }}
        onChange={(paging, filters, sorts, extra) => {
          const convertedSorts = getTableSort(sorts);
          onChange && onChange(paging, filters, { origin: sorts, converted: convertedSorts }, extra);
        }}
        columns={currentColumns}
        {...rest}
        pagination={
          pagination && {
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            showSizeChanger: true,
            defaultPageSize: PAGE_SIZE,
            showTotal: renderTotal,
            ...pagination,
            onChange: handlerChangePagination
          }
        }
      />
    </div>
  );
};
