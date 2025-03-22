import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { LOCAL_STORAGE } from '@/constants/common';
import { Login, UserApi } from '@/service/API';
import { store } from '@/store';
import { UserState, setUserConfig, setUserInfo } from '@/store/slices/auth';
import { loadingStore, startAuthLoading, stopAuthLoading } from '@/store/slices/loading';
import { getRemainWorkingTimes, logout } from '@/utilities/auth';
import { isDev } from '@/utilities/env';

type AttributeType = {
  URL: string[];
  ICON?: string[];
  COMPONENT: string[];
};

type DataType = {
  composite: boolean;
  name: string;
  description: string;
  id: string;
  containerId: string;
  hasUser: boolean;
  attributes: AttributeType;
  children?: DataType[];
};
interface MenuItem {
  name: string;
  description: string;
  id: string;
  containerId: string;
  url?: string;
  icon?: string;
  component?: string;
  children?: MenuItem[];
}

export default function useAuth() {
  const dispatch = useAppDispatch();
  const { authLoading } = useAppSelector<any>(loadingStore);
  async function createAuthState() {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    if (token) {
      await _initUser();
    }
  }

  const _initUser = async () => {
    const remainWorkingTimes = getRemainWorkingTimes();
    if (remainWorkingTimes && remainWorkingTimes < 60) {
      //   logout();
      //   return;
    }

    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    const maybeTokenUndefined = 'Bearer undefined';
    if (!token || token === maybeTokenUndefined) {
      logout();
      return;
    }

    try {
      dispatch(startAuthLoading());
      await _getMe();
      await _getUserConfig();
      _updateOtherInfo();
      !isDev && (await _savingAppVersion());
    } catch (_) {
      //
    } finally {
      dispatch(stopAuthLoading());
    }
  };

  const _getMe = async () => {
    try {
      const res = await Login.getUser();
      // const res = await UserApi.getMe();
      const dataUser = res.data;
      const dataUserStorage = {
        id: dataUser.id,
        username: dataUser.username,
        fullName: dataUser.fullName,
        email: dataUser.email,
        groupNames: dataUser.groupNames,
        groupIds: dataUser.groupIds,
        des: dataUser.attributes.des[0],
        nameUnitManagement: dataUser.attributes.nameUnitManagement[0],
        phone: dataUser.attributes.phone[0],
        position: dataUser.attributes.position[0],
        unitManagement: dataUser.attributes.unitManagement[0]
      };
      localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(dataUserStorage));
      setUserInfo({
        userInfo: {
          userInfo: {
            ...res
          }
        }
      });
      // debugger
      // );
      // await dispatch(getDanhSachNhomQuyen());
      // dispatch(getDanhSachLanhDao());
    } catch (error) {
      // logoutByGetMeFail();
    }
  };

  const _updateOtherInfo = async () => {
    const userState = store.getState().authManager as UserState;
    if (!userState.userInfo) return;
    dispatch(
      setUserInfo({
        userInfo: {
          detail: {
            ...userState.userInfo?.detail
          }
        }
      })
    );
  };

  const processData = (data: DataType[]) => {
    const parentArray: any[] = [];
    const childrenObject: Record<string, any[]> = {};
    data.forEach((item) => {
      const { attributes, children, ...rest } = item;
      const newItem = {
        ...rest,
        url: attributes?.URL?.[0] || '',
        component: attributes?.COMPONENT?.[0] || '',
        icon: attributes?.ICON?.[0] || '',
        attributes // Giữ lại attributes gốc
      };

      // Lưu vào parentArray
      parentArray.push(newItem);

      // Nếu có children, xử lý đệ quy
      if (children) {
        const convertMenu = (menu: any[]): MenuItem[] => {
          return menu.map((item) => ({
            name: item.name,
            description: item.description,
            id: item.id,
            containerId: item.containerId,
            url: item?.attributes?.URL?.[0] || `/`, // fix tạm
            icon: item?.attributes?.ICON?.[0] || '',
            component: item?.attributes?.COMPONENT?.[0] || '',
            children: item.children.length ? convertMenu(item.children) : undefined
          }));
        };
        childrenObject[item.name] = convertMenu(children);
      }
    });
    return { parentArray, childrenObject };
  };

  const _getUserConfig = async () => {
    try {
      dispatch(startAuthLoading());
      const res: any = await UserApi.getUserConfig();
      const { parentArray, childrenObject } = processData(res.data);
      dispatch(
        setUserConfig({
          config: {
            menuHeader: parentArray,
            menuSidebar: childrenObject
          }
        })
      );
      dispatch(stopAuthLoading());
    } catch (_) {
      dispatch(stopAuthLoading());
    }
  };

  const _savingAppVersion = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CONTEXT_PATH}/version.json`);
      const serverVersionResponse = await response.json();
      localStorage.setItem('appVersion', serverVersionResponse.hash);
    } catch (_) {
      //
    }
  };

  return {
    createAuthState,
    authLoading
  };
}
