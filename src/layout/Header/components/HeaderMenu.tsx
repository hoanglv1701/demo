import React, { useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Image, Tooltip } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import '../styles.less';
import { PopoverNotificationRef } from '../types';
import ModalChangePassword from './ModalChangePassword';
import ModalThongTinCaNhan from './ModalThongTinCaNhan';
import { LOCAL_STORAGE } from '@/constants/common';
import useAccountLogin from '@/hooks/useAccountLogin';
import { NotificationApi, UserApi } from '@/service/API';
import { logout } from '@/utilities/auth';
import { isDev } from '@/utilities/env';

const HeaderMenu: React.FC = () => {
  const { currentUser } = useAccountLogin();

  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [openThongTinCaNhan, setOpenThongTinCaNhan] = useState<boolean>(false);
  const [isMultipleApplication, setIsMultipleApplication] = useState(false);
  const userInfo = localStorage.getItem(LOCAL_STORAGE.USER_INFO);
  const dataUser = userInfo ? JSON.parse(userInfo || '') : null;

  // const userInfo = JSON.parse()
  const notificationRef = useRef<PopoverNotificationRef>(null);

  useEffect(() => {
    if (!currentUser?.id) return;
    fetchDanhSachPhanMemTruyCap();
  }, [currentUser?.id]);

  const fetchDanhSachPhanMemTruyCap = async () => {
    try {
      const res = await UserApi.getDanhSachPhanMemTruyCap();
      setIsMultipleApplication(res?.data.length > 1);
    } catch (error) {
      //
    }
  };

  const authChannel = new BroadcastChannel('auth');

  authChannel.onmessage = (event) => {
    if (event.data === 'logout') {
      logout();
    }
  };

  useEffect(() => {
    return () => {
      authChannel.close();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await NotificationApi.logoutNoti();
    } catch (_) {
      //
    } finally {
      logout();
      authChannel.postMessage('logout');
      authChannel.close();
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Thông tin cá nhân',
      key: '1',
      onClick: () => {
        setOpenThongTinCaNhan(true);
      }
    },
    {
      label: 'Đổi mật khẩu',
      key: '2',
      onClick: () => {
        setOpenChangePassword(true);
      }
    },
    {
      label: 'Chọn phần mềm',
      key: '3',
      style: { display: isMultipleApplication ? 'block' : 'none' },
      onClick: () => {
        window.location.href = isDev ? import.meta.env.VITE_SSO_URL : window.location.origin;
      }
    },
    {
      label: 'Đăng xuất',
      key: '4',
      onClick: handleLogout
    }
  ];

  return (
    <>
      <Flex gap={24} align='center' className='header-menu'>
        <Tooltip title='Thông báo' trigger={['hover', 'focus']}>
          {/* <PopoverNotification ref={notificationRef}>
            <BellOutlined className='bg-transparent  text-xl' style={{ color: 'var(--gt-primary-color)' }} />
          </PopoverNotification> */}
        </Tooltip>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement='bottomRight'
          arrow
          className='cursor-pointer leading-4'
        >
          <Link to='' onClick={(e) => e.preventDefault()} data-test-id='header-settings'>
            <Flex gap={8} align='center'>
              <Image
                src='default-avt.jpg'
                style={{
                  padding: 1,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: '1px solid var(--gt-primary-color)'
                }}
                preview={false}
              />
              <div className='flex flex-col'>
                <span
                  style={{ fontSize: '12px', marginBottom: '-4px', fontWeight: 600, color: 'var(--gt-base-color)' }}
                >
                  {dataUser?.fullName ?? 'Nguyễn Văn A'}
                </span>
              </div>
              <DownOutlined />
            </Flex>
          </Link>
        </Dropdown>
      </Flex>
      <ModalChangePassword
        open={openChangePassword}
        onClose={() => {
          setOpenChangePassword(false);
        }}
      />
      <ModalThongTinCaNhan
        open={openThongTinCaNhan}
        dataUser={dataUser || {}}
        onClose={() => {
          setOpenThongTinCaNhan(false);
        }}
      />
    </>
  );
};

export default HeaderMenu;
