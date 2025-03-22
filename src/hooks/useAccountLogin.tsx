import { lazy } from 'react';
import * as AntdIcons from '@ant-design/icons';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { componentMap } from '@/routes';
// import DemoDocumentEditor from '@/pages/DocumentEditor';
// import { componentMap } from '@/routes';
import { UserApi } from '@/service/API';
import { AUTH_MANAGER } from '@/store/config';
import { UserState, setUserInfo } from '@/store/slices/auth';
import { logout } from '@/utilities/auth';

const NotFound = lazy(() => import('../pages/404/index'));
export default function useAccountLogin() {
  const userState = useAppSelector<UserState>((state) => state[AUTH_MANAGER]);
  const dispatch = useAppDispatch();

  const currentUser = userState?.userInfo?.detail;
  const currentNhomQuyen = userState?.nhomQuyen?.data;
  const chuKy = currentUser?.chuKy;
  const config = userState?.config;

  const currentMenu = generateRoutes(config?.menuUser);
  function signOut() {
    dispatch(setUserInfo(undefined));
    logout();
  }

  function getToken() {
    //logic get token
  }

  function isCreatedByCurrentUser(idNguoiTao: string) {
    return idNguoiTao === currentUser?.id;
  }

  return {
    currentUser,
    currentNhomQuyen,
    chuKy,
    config,
    currentMenu,
    signOut,
    getToken,
    isCreatedByCurrentUser
  };
}

// const generateRoutes = (menuByRole: UserApi.UserConfig['menuByRole']): any[] => {
//   return (
//     menuByRole?.map((item: any) => ({
//       key: item.attributes?.URL[0] ?? '',
//       label: item.label || item.description,
//       children: item.children ? generateRoutes(item.children) : undefined,
//       component: item.attributes?.COMPONENT?.[0] ? _loadComponent(item.attributes?.COMPONENT?.[0]) : undefined,
//       icon: item.attributes?.ICON?.[0] ? <CustomIcon type={item.attributes?.ICON?.[0]} /> : undefined,
//       code: item.code
//     })) ?? []
//   );
// };
const generateRoutes = (menuByRole: UserApi.UserConfig['menuByRole']): MenuItem[] => {
  return (
    menuByRole?.map((item: any) => ({
      key: item.url ?? '',
      label: item.description,
      children: item.children ? generateRoutes(item.children) : undefined,
      component: item.component ? _loadComponent(item.component) : undefined,
      icon: item.iconCls ? <CustomIcon type={item.iconCls} /> : undefined,
      code: item.code
    })) ?? []
  );
};
export const _loadComponent = (componentName: string) => {
  const importFunc = componentMap[componentName];
  if (!importFunc) {
    return NotFound;
  }

  return importFunc;
};

const CustomIcon = ({ type }: { type: string }) => {
  const AntdIcon = (AntdIcons as any)[type];
  return AntdIcon && <AntdIcon />;
};
