import React from 'react';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import './index.less';
import { Button, Modal } from '@/components/Atoms';

interface DeleteModalConfirmProps {
  open: boolean;
  title?: string;
  name?: string;
  onCancel: () => void;
  onConfirm: () => void;
  okText?: string;
}

export const DeleteModalConfirm: React.FC<DeleteModalConfirmProps> = (props) => {
  const {
    open,
    name = ' ',
    title = `Bạn có chắc chắn muốn xóa [${name}]?`,
    onCancel,
    onConfirm,
    okText = 'Xóa'
  } = props;
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width='350px'
      onOk={onConfirm}
      footer={null}
      modalRender={(node) => <div id='delete-modal'>{node}</div>}
      closeIcon={<CloseOutlined style={{ color: 'black' }}></CloseOutlined>}
    >
      <div className='flex items-center gap-3 mt-3'>
        <ExclamationCircleOutlined style={{ fontSize: 24, color: 'red' }} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          Xác nhận xóa
        </Typography.Title>
      </div>
      <Typography.Text style={{ color: '#666' }}>{title}</Typography.Text>

      <div className='flex justify-center gap-4 mt-8 mb-2'>
        <Button className='w-[80px]' danger ghost onClick={onCancel}>
          Hủy
        </Button>
        <Button className='w-[80px]' type='primary' onClick={onConfirm}>
          {okText}
        </Button>
      </div>
    </Modal>
  );
};
