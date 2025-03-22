import React from 'react';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import './index.less';
import { Button, Modal } from '@/components/Atoms';

interface NotificationConfimProps {
  open: boolean;
  title?: string;
  text?: string;
  onCancel: () => void;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}

export const NotificationConfim: React.FC<NotificationConfimProps> = (props) => {
  const { open, title = 'Thông báo', text, onCancel, onConfirm, okText = 'Đồng ý', cancelText = 'Hủy', icon } = props;
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
        {icon ? icon : <ExclamationCircleOutlined className='text-blue-500 text-xl' />}

        <Typography.Title level={4} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </div>
      <Typography.Text style={{ color: '#666' }}>{text}</Typography.Text>

      <div className='flex justify-center gap-4 mt-8 mb-2'>
        <Button className='w-[80px]' danger ghost onClick={onCancel}>
          {cancelText}
        </Button>
        <Button className='w-[80px]' type='primary' onClick={onConfirm}>
          {okText}
        </Button>
      </div>
    </Modal>
  );
};
