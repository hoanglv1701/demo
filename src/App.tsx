/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useIdleTimer } from 'react-idle-timer';
// import { UploadQueueProvider } from './components/Business/UploadLargeFile/hooks/UploadQueueProvider';
// import UploadPanel from './components/Business/UploadLargeFile/src/UploadPanel';
import { LOCAL_STORAGE } from './constants/common';
// import { Route, RouterProvider, Routes, useSearchParams } from 'react-router-dom';
import { useAppSelector, useAsyncEffect, useAxiosInterceptor } from './hooks';
import useAuth from './hooks/useAuth';
import ModalChangePassword from './layout/Header/components/ModalChangePassword';
import { NotificationApi } from './service/API';
import useStaticAlert from './staticAlert';
import { loadingStore } from './store/slices/loading';
import { logout } from './utilities/auth';
import AuthLayout from '@/layout';

export function App() {
  useAxiosInterceptor();

  const currentUrl = new URL(window.location.href);
  const { createAuthState } = useAuth();
  const { loading } = useAppSelector(loadingStore);
  const isFirst = localStorage.getItem(LOCAL_STORAGE.FIRST_LOGIN);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  useEffect(() => {
    if (isFirst == 'true' && currentUrl.pathname !== '/logout') {
      setOpenChangePassword(true);
    }
  }, [currentUrl]);

  useEffect(() => {
    //TODO: disable splashScreen
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.style.opacity = '0';
      const timeoutId = setTimeout(() => {
        splashScreen.remove();
        clearTimeout(timeoutId);
      }, 500);
    }
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    if (!token) {
      logout()
    }
  }, []);

  useAsyncEffect(async () => {
    await fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      await createAuthState();
      // if (authCode) {
      // clearUrlSearchQuery();
      // }
    } catch (_) {
      //
    } finally {
      //
    }
  };

  useIdleTimer({
    timeout: 3600000,
    promptBeforeIdle: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
      'focus'
    ],
    onIdle: () => {
      handleLogout();
    }
  });

  const handleLogout = async () => {
    try {
      await NotificationApi.logoutNoti();
    } catch (_) {
      //
    } finally {
      logout();
    }
  };
  const { authLoading } = useAuth();

  useStaticAlert();

  return (
    <>
      <div className='app'>
        <Spin spinning={loading || authLoading} fullscreen style={{ zIndex: 3001 }} size='large' />
        <AuthLayout />
      </div>
      <ModalChangePassword
        title='Đổi mật khẩu lần đầu'
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        isFirst={true}
      />
    </>
  );
}

App.propTypes = {};

export default App;
