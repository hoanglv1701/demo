import { useEffect, useState } from 'react';
import { Modal, Typography } from 'antd';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import LoadComponentFallback from '@/components/Atoms/LoadComponentFallback';
import { LOCAL_STORAGE } from '@/constants/common';
import useAuth from '@/hooks/useAuth';
import { isDev } from '@/utilities/env';
import { qtudApiUrl } from '@/service';

export default function NotFound({ notFound }: { notFound?: boolean }) {
  const [modal, contextHolder] = Modal.useModal();
  const { authLoading } = useAuth();
  const [defaultContent, setDefaultContent] = useState<string>('');

  const checkForUpdates = async () => {
    const response = await fetch(`${import.meta.env.VITE_CONTEXT_PATH}/version.json`);
    const serverVersionResponse = await response.json();
    const currentVersion = localStorage.getItem('appVersion');
    if (currentVersion && currentVersion !== serverVersionResponse.hash) {
      setDefaultContent('Bản cập nhật mới khả dụng, vui lòng tải lại trang');
      modal.confirm({
        title: 'Cảnh báo',
        content: 'Bản cập nhật mới khả dụng, vui lòng tải lại trang',
        okText: 'Tải lại trang',
        cancelText: 'Đóng',
        centered: true,
        onOk: () => {
          localStorage.setItem('appVersion', serverVersionResponse.hash);
          location.reload();
        }
      });
    } else {
      localStorage.setItem('appVersion', serverVersionResponse.hash);
    }
  };

  const getAuthCodeHealthCheck = async () => {
    try {
      // const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
      // const authCode = localStorage.getItem(LOCAL_STORAGE.AUTH_CODE);
      // const maybeTokenUndefined = 'Bearer undefined';

      // if (!token || !authCode || token === maybeTokenUndefined) return;

      // const response: any = await fetch(`${qtudApiUrl}/api/health-check`, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `${token}`,
      //     AuthCode: `${authCode}`
      //   }
      // });
      // if (response.status === 499) {
      //   setDefaultContent('499: Dịch vụ đang bị chặn bởi phần mềm diệt virus, Đang tải lại trang...');
      // }
    } catch (_) {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    if (isDev) return;
    checkForUpdates();
    getAuthCodeHealthCheck();
  }, []);

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 499) {
      return (
        <>
          {contextHolder}
          <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
            <Typography.Title style={{ color: 'white' }}>
              499: Dịch vụ đang bị chặn bởi phần mềm diệt virus, xin vui lòng tải lại trang
            </Typography.Title>
          </div>
        </>
      );
    }

    if (error.status === 404) {
      return (
        <>
          {contextHolder}
          <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
            <Typography.Title style={{ color: 'white' }}>Yêu cầu hết hạn, xin vui lòng tải lại trang</Typography.Title>
          </div>
        </>
      );
    }
  }

  if (authLoading) {
    return <LoadComponentFallback />;
  }

  if (notFound) {
    return (
      <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
        <Typography.Title style={{ color: 'white' }}>Đường dẫn không hợp lệ!</Typography.Title>
      </div>
    );
  }

  if ((error as any)?.message?.includes('Failed to fetch dynamically imported module')) {
    return (
      <>
        {contextHolder}

        <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
          <Typography.Title style={{ color: 'white' }}>Vui lòng tải lại trang</Typography.Title>
        </div>
      </>
    );
  }

  return (
    <>
      {contextHolder}

      <div style={{ height: 'calc(100vh - 37px)' }} className='flex items-center justify-center'>
        <Typography.Title style={{ color: 'white' }}>{defaultContent || 'Tính năng đang phát triển'}</Typography.Title>
      </div>
    </>
  );
}
