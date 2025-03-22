import { lazy } from 'react';
import { BookOutlined } from '@ant-design/icons';
import { MenuItem } from '@/layout/SiderBar/types';

export const componentMap: { [x: string]: any } = {
};

export const bottomMenu: MenuItem[] = [
  {
    key: '/log',
    icon: <BookOutlined />,
    label: 'Log hệ thống'
    // component: lazy(() => import('../pages/Dashboard'))
  }
];
