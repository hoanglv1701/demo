import React, { useEffect } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu, MenuProps, Modal, Tooltip } from 'antd';
import type { GetProp } from 'antd';
import { Button } from '../Button';
import { MenuProvider, MenuProviderType, useMenuProvider } from './hooks/MenuProvider';
import './styles.less';
import { DocumentData } from '@/components/Business/DanhSachBieuMau/BieuMauHandler/components/BieuMauContainer/types';
import { useCheckDirty } from '@/hooks/useCheckDirty';

export { MenuProvider, useMenuProvider } from './hooks/MenuProvider';
export type { MenuProviderType } from './hooks/MenuProvider';

export type MenuItem = GetProp<MenuProps, 'items'>[number];

export interface MenuDocumentProps extends Omit<MenuProps, 'items'> {
  isDanhSachManHinhQuanLy?: boolean;
  width?: number | string;
  children: React.ReactNode;
  menuItemBg?: string;
  menuItemHoverBg?: string;
  items: Common.MenuItemWithData[];
  addons?: React.ReactNode;
  isDirtyContent?: boolean;
  footer?: (
    selectedData: any,
    label: any,
    addtionalData: any,
    updateAdditionalData: (data: any) => void
  ) => React.ReactNode;
  header?: React.ReactNode;
}

export interface TabDocumentContainerProps extends Omit<MenuDocumentProps, 'children'> {
  isDanhSachManHinhQuanLy?: boolean;
}

const TabDocument = ({
  width = 256,
  items,
  menuItemBg = 'transparent',
  menuItemHoverBg = 'var(--gt-light-green-color)',
  ...props
}: Omit<MenuDocumentProps, 'children'>) => {
  const { key, updateDocument } = useMenuProvider() as MenuProviderType;
  const [, contextHolder] = Modal.useModal();
  const { checkDirty } = useCheckDirty();

  const onSelect: MenuProps['onSelect'] = (e) => {
    const { key, item } = e as any;
    const taiLieu = (item as any)?.props?.data as DocumentData;
    const label = (e.domEvent?.target as HTMLElement)?.innerHTML;

    const additionalData = {
      doMat: taiLieu?.doMat,
      doKhan: taiLieu?.doKhan,
      trichYeu: taiLieu?.trichYeu,
      isReload: taiLieu?.isReload,
      isConfirm: taiLieu?.isConfirm,
      version: taiLieu?.version
    };

    checkDirty(
      () => updateDocument(key, label, taiLieu, additionalData),
      'Văn bản hiện tại có sự thay đổi. Vui lòng lưu dữ liệu trước khi chuyển tài liệu, nếu không sẽ mất hết các thay đổi'
    );
  };

  const focusOnFirstItem = () => {
    const firstItem = items[0];
    const title = firstItem.label?.props?.title;
    const taiLieu = firstItem?.data as DocumentData;
    const additionalData = {
      doMat: taiLieu?.doMat,
      doKhan: taiLieu?.doKhan,
      trichYeu: taiLieu?.trichYeu,
      isReload: taiLieu?.isReload,
      isConfirm: taiLieu?.isConfirm,
      version: taiLieu?.version
    };
    updateDocument(firstItem.key, title, taiLieu, additionalData);
  };

  useEffect(() => {
    if (!items || !items.length) return;
    if (key) {
      const currentTaiLieu = items.find((taiLieu) => taiLieu.key === key);
      if (!currentTaiLieu) return;

      const additionalData = {
        doMat: currentTaiLieu.data?.doMat,
        doKhan: currentTaiLieu?.data?.doKhan,
        trichYeu: currentTaiLieu.data?.trichYeu,
        isReload: currentTaiLieu.data?.isReload,
        isConfirm: currentTaiLieu.data?.isConfirm,
        version: currentTaiLieu.data?.version
      };

      updateDocument(currentTaiLieu.key, currentTaiLieu.label, currentTaiLieu.data, additionalData);
      return;
    }

    focusOnFirstItem();
  }, [items, key]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: menuItemBg,
            itemHoverBg: menuItemHoverBg,
            iconSize: 18,
            collapsedIconSize: 18
          }
        }
      }}
    >
      <Menu
        {...props}
        onSelect={onSelect}
        style={{ width: width, borderRight: 0 }}
        className='gt-menu-document'
        data-test-id='menu-document'
        mode='inline'
        items={items as MenuItem[]}
        {...(items && items.length && { defaultSelectedKeys: [items[0]?.key] })}
        selectedKeys={[key as string]}
      />
      {contextHolder}
    </ConfigProvider>
  );
};

const TabDocumentContainer = ({
  width,
  addons,
  header,
  footer,
  isDanhSachManHinhQuanLy,
  items,
  ...props
}: TabDocumentContainerProps) => {
  const { documentData, label, menuStorage, updateMenuStorage, collapse, setCollapse } =
    useMenuProvider() as MenuProviderType;

  const updateAdditionalData = (data: any) => {
    updateMenuStorage({ ...menuStorage, ...data });
  };

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='w-full mx-1'>
        <Tooltip title={collapse ? 'Mở rộng' : 'Thu gọn'}>
          <Button
            disabled={false}
            icon={collapse ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            onClick={() => setCollapse((prev) => !prev)}
          />
        </Tooltip>
      </div>

      <div
        className='flex-grow overflow-hidden'
        style={{ width: collapse ? 0 : Number(width), transition: 'width 0.5s ease' }}
      >
        <div
          className={`flex flex-col gap-2 h-full tab-document-content ${collapse ? 'tab-document-content-hidden' : ''}`}
          style={{ opacity: collapse ? 0 : 1 }}
        >
          {header && <div className='w-full'>{header}</div>}
          <div className='flex flex-col flex-grow overflow-hidden'>
            <div
              className='overflow-y-auto overflow-x-hidden'
              style={!isDanhSachManHinhQuanLy ? { maxHeight: '60%' } : { height: '100%' }}
            >
              <TabDocument width={width} {...props} items={items} />
            </div>
            <div className='flex-1 overflow-hidden'>{!!addons && addons}</div>
          </div>
          <div>{footer && footer(documentData, label, menuStorage, updateAdditionalData)}</div>
        </div>
      </div>
    </div>
  );
};

export const MenuDocument: React.FC<MenuDocumentProps> = ({
  width = 256,
  isDanhSachManHinhQuanLy,
  children,
  addons,
  ...props
}) => {
  return (
    <MenuProvider>
      <div className='flex-grow w-full overflow-scroll h-full'>
        <div className='flex align-top h-full'>
          <TabDocumentContainer
            width={width}
            addons={addons}
            isDanhSachManHinhQuanLy={isDanhSachManHinhQuanLy}
            {...props}
          />
          <div className='flex-grow overflow-hidden relative' id='bieu-mau-container'>
            {children}
          </div>
        </div>
      </div>
    </MenuProvider>
  );
};
