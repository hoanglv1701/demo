import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { Button } from '@/components/Atoms';
import useTheme from '@/hooks/useTheme';
import { Theme } from '@/styles/themeGlobal';

const HOTLINE_SUPPORT = `${import.meta.env.VITE_SUPPORT_HOTLINE}`;

const Footer: React.FC = () => {
  const { theme, selectTheme } = useTheme();
  const listThemeSelect: MenuProps['items'] = [
    {
      key: Theme.Primary,
      label: (
        <a className='flex h-[25px] items-center'>
          <div
            style={{
              display: 'flex',
              justifyItems: 'center',
              borderRadius: '50%',
              background: '#1b594f',
              height: '16px',
              width: '16px',
              marginRight: '8px'
            }}
          ></div>
          Mặc định
        </a>
      ),
      onClick: () => selectTheme(Theme.Primary)
    },
    {
      key: Theme.Secondary,
      label: (
        <a className='flex h-[25px] items-center'>
          <div
            style={{
              display: 'flex',
              justifyItems: 'center',
              borderRadius: '50%',
              background: '#3b514f',
              height: '16px',
              width: '16px',
              marginRight: '8px'
            }}
          ></div>
          Xanh
        </a>
      ),
      onClick: () => selectTheme(Theme.Secondary)
    }
  ];
  return (
    <div
      className=' absoult'
      style={{
        backgroundColor: 'var(--gt-background-layout)',
        height: 'var(--gt-footer-height)',
        borderTop: '1px solid var(--gt-primary-color)'
      }}
    >
      <div className='flex items-center justify-end h-[100%] mr-[10px]'>
        <Dropdown
          menu={{
            items: listThemeSelect
          }}
          trigger={['click']}
        >
          <Button size='middle' icon={<SettingOutlined />}></Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Footer;
