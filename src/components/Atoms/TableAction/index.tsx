// import {
//   CopyOutlined,
//   DeleteOutlined,
//   DownloadOutlined,
//   EditOutlined,
//   EyeOutlined,
//   SendOutlined
// } from '@ant-design/icons';
import {
  CopyOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  EditOutlined,
  FileAddOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, MenuProps, Tooltip } from 'antd';
import { Space } from 'antd/lib';
import { Button } from '../Button';
import './styles.less';

export interface TableActionProps {
  onViewDetail?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onDownload?: () => void;
  onClone?: () => void;
  onCreate?: () => void;
  disabled?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    download?: boolean;
    clone?: boolean;
    create?: boolean;
  };
  anotherEvent?: JSX.Element;
  titleCreate?: string;
  menu?: MenuProps['items'];
}
export const TableAction = ({
  onViewDetail,
  onDelete,
  onEdit,
  onDownload,
  onClone,
  anotherEvent,
  disabled,
  onCreate,
  titleCreate,
  menu
}: TableActionProps) => {
  return (
    <div className='flex justify-center'>
      <Space>
        {onCreate && (
          <Tooltip title={titleCreate}>
            <Button
              disabled={disabled?.create}
              onClick={onCreate}
              icon={
                <FontAwesomeIcon
                  icon={['fas', 'paper-plane']}
                  size='lg'
                  color='var(--gt-create-action-color)'
                  opacity={disabled?.create ? 0.25 : 1}
                />
              }
            />
          </Tooltip>
        )}
        {onViewDetail && (
          <Tooltip title='Chi tiết'>
            <Button disabled={disabled?.view} onClick={onViewDetail} icon={<FileAddOutlined />} />
          </Tooltip>
        )}
        {onClone && (
          <Tooltip title='Nhân bản'>
            <Button disabled={disabled?.clone} onClick={onClone} icon={<CopyOutlined />} />
          </Tooltip>
        )}
        {onEdit && (
          <Tooltip title='Cập nhật'>
            <Button disabled={disabled?.edit} onClick={onEdit} icon={<EditOutlined />} />
          </Tooltip>
        )}
        {onDownload && (
          <Tooltip title='Tải về'>
            <Button disabled={disabled?.download} onClick={onDownload} icon={<DownCircleOutlined />} />
          </Tooltip>
        )}
        {menu?.length && (
          <Dropdown
            menu={{ items: menu }}
            trigger={['click']}
            placement='bottomRight'
            arrow
            className='cursor-pointer leading-4'
          >
            <Button icon={<MenuOutlined />}></Button>
          </Dropdown>
        )}
        {onDelete && (
          <Tooltip title='Xóa'>
            {/* <span className='pop-up-delete'>
              <Popconfirm title='Xác nhận xóa' description='Bạn có chắc muốn xoá?' onConfirm={onDelete}> */}
            <Button disabled={disabled?.delete} onClick={onDelete} icon={<DeleteOutlined />} />
            {/* </Popconfirm>
            </span> */}
          </Tooltip>
        )}
        {anotherEvent}
      </Space>
    </div>
  );
};
