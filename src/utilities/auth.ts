import dayjs from 'dayjs';
import { LOCAL_STORAGE } from '@/constants/common';
import { localUrl, qtudApiUrl } from '@/service';
import { modal } from '@/staticAlert';

export const logoutExpired = () => {
  modal.warning({
    title: 'Phiên làm việc đã hết hạn',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const logoutByAuthCodeExpired = () => {
  modal.warning({
    title: 'Tài khoản của bạn đã bị đăng xuất trên một thiết bị khác',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const logoutByEventLogoutReceived = () => {
  modal.warning({
    title: 'Tài khoản của bạn đã bị đăng nhập hoặc đăng xuất trên một thiết bị khác',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const logoutByGetMeFail = () => {
  modal.warning({
    title: 'Lấy thông tin tài khoản thất bại',
    content: 'Vui lòng đăng nhập lại',
    centered: true,
    onOk: () => {
      logout();
    }
  });
};

export const getRemainWorkingTimes = () => {
  const expiredDateStr = localStorage.getItem(LOCAL_STORAGE.EXPIRES_IN);
  if (!expiredDateStr) return;
  const currentTime = dayjs();
  const remainWorkingTimes = dayjs(expiredDateStr).diff(currentTime, 'minute');
  // debugger
  return remainWorkingTimes;
};

export const logout = () => {
  localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, '');
  localStorage.setItem(LOCAL_STORAGE.COLLAPSED_MENU, '');
  sessionStorage.clear();
  const logoutURL = `/logout`;
  if (window.location.pathname != logoutURL) window.location.href = logoutURL;
};
