import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import { Layout, Menu, Spin } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalLichSuCapNhat from './components/ModalLichSuCapNhat';
import './index.less';
import { MenuItem, SideBarProps, SideBarRef } from './types';
import { EachElement, TextTooltip } from '@/components/Atoms';
import { useAppSelector, useDrawer } from '@/hooks';
import { loadingStore } from '@/store/slices/loading';

const SiderBar = forwardRef(function SiderBar({ mainMenu, bottomMenu }: SideBarProps, ref: ForwardedRef<SideBarRef>) {
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectionMenu, setSelectionMenu] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { open: openLichSuCapNhat, ref$: refLichSuCapNhat$ } = useDrawer<undefined>();
  const { authLoading } = useAppSelector<any>(loadingStore);
  const menuLoading = authLoading && mainMenu && mainMenu.length === 0;

  useImperativeHandle(ref, () => ({
    updateCollapse(newState) {
      setCollapsed(newState);
    }
  }));

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const handleClickMenuItem = async (key: string) => {
    if (key === '/lich-su-cap-nhat') {
      openLichSuCapNhat();
      return;
    }
    if (key === '/huong-dan-su-dung') {
      // const response = await fetch(huongDanSuDungPhanMemPdf);
      // const blob = await response.blob();
      // await downloadByData(blob, 'HDSD phần mềm.pdf', false);
      return;
    }
    navigate(key);
  };

  useEffect(() => {
    if (!collapsed) {
      const activeOpenKeys = getActiveOpenKeys(mainMenu);
      setOpenKeys(activeOpenKeys);
    }
  }, [mainMenu, collapsed]);

  function getActiveOpenKeys(menu: MenuItem[], key: string = '', initialValue: string[] = []) {
    menu.forEach((item) => {
      initialValue = openKeys.concat(initialValue)
      location.pathname.includes(item.key) && key && initialValue.push(key);
      item.children ? getActiveOpenKeys(item.children, item.key, initialValue) : undefined;
    });
    return initialValue;
  }

  useEffect(() => {
    setSelectionMenu([location.pathname]);
  }, [location]);

  function renderMainMenu(menu: MenuItem[]): MenuItemType[] {
    return menu.map((item) => ({
      ...item,
      label: (
        <TextTooltip
          className='gt-sider-main-menu-item'
          ellipsis={{
            tooltip: { title: <span style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</span>, placement: 'right' }
          }}
        >
          <EachElement of={item.label ? item.label.split(' ') : []} render={(i) => <span>{i}</span>} />
        </TextTooltip>
      ),
      children: item.children ? renderMainMenu(item.children) : undefined
    }));
  }

  return (
    <Sider
      className='gt-sider'
      collapsedWidth={'var(--gt-sider-collapsed-width)'}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={collapsed ? 80 : 280}
    >
      <Spin
        spinning={menuLoading}
        className='h-full flex items-center justify-center'
        indicator={
          <div>
            <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
          </div>
        }
        style={{ backgroundColor: 'var(--gt-base-color)' }}
      />

      <Menu
        mode='inline'
        theme='dark'
        className='gt-sidebar-main-menu'
        rootClassName='gt-menu-layout'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectionMenu}
        items={renderMainMenu(mainMenu)}
        onClick={(e) => handleClickMenuItem(e.key)}
      />

      <Menu
        mode='inline'
        theme='dark'
        className='gt-sidebar-bottom-menu'
        rootClassName='gt-menu-layout'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectionMenu}
        items={bottomMenu}
        onClick={(e) => handleClickMenuItem(e.key)}
      />
      {/* <div className='gt-navbar-bg'></div> */}
    </Sider>
  );
});

export default SiderBar;
