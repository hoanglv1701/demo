import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import HeaderMenu from './components/HeaderMenu';
import Menu from './components/Menu';
import './styles.less';
import { HeaderProps, HeaderRef } from './types';
import { Button } from '@/components/Atoms';

const { Header } = Layout;

const Headers = forwardRef(function Headers({ onChange, onChangeMenu }: HeaderProps, ref: ForwardedRef<HeaderRef>) {
  const [collapsed, setCollapsed] = useState(false);

  useImperativeHandle(ref, () => ({
    updateCollapse(newState) {
      setCollapsed(newState);
    }
  }));

  function handleChange() {
    const newState = !collapsed;
    onChange(newState);
    setCollapsed(newState);
  }

  function handleChangeMenu(item: any) {
    onChangeMenu(item)
  }

  return (
    <Header className='gt-layout-header'>
      <div className='heading'>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleChange}
          style={{
            fontSize: '16px',
            width: 'var(--gt-header-height)',
            height: 'var(--gt-header-height)'
          }}
        />
        <Menu onChangeMenu={handleChangeMenu} />
      </div>

      <HeaderMenu />
    </Header>
  );
});

export default Headers;
