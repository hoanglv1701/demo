import { createSlice } from '@reduxjs/toolkit';
import { getDanhSachLanhDao, getDanhSachNhomQuyen } from './services';
import { UserApi } from '@/service/API';
import { AUTH_MANAGER } from '@/store/config';

export interface UserState {
  userInfo?: UserApi.UserInfo;
  chuKy?: string;
  config?: {
    menuHeader: any[];
    menuSidebar: any;
    menuUser: any[];
  };
  danhSachLanhDao: {
    hasData: boolean;
    data: UserApi.LanhDao[];
  };
  nhomQuyen: {
    hasData: boolean;
    data: UserApi.Role[];
  };
}

const initialState: UserState = {
  userInfo: undefined,
  chuKy: undefined,
  config: {
    menuHeader: [],
    menuSidebar: {},
    menuUser: []
  },
  danhSachLanhDao: {
    hasData: false,
    data: []
  },
  nhomQuyen: {
    hasData: false,
    data: []
  }
};

export const authSlice = createSlice({
  name: AUTH_MANAGER,
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload?.userInfo;
      state.chuKy = action.payload?.chuKy;
    },
    setUserConfig(state, action) {
      state.config = {
        menuHeader: action.payload?.config?.menuHeader,
        menuSidebar: action.payload?.config?.menuSidebar,
        menuUser: action.payload?.config?.menuUser
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDanhSachLanhDao.fulfilled, (state, action) => {
      state.danhSachLanhDao.data = (action.payload as Service.PageResponse<UserApi.LanhDao>)?.data?.list;
      state.danhSachLanhDao.hasData = true;
    });
    builder.addCase(getDanhSachNhomQuyen.fulfilled, (state, action) => {
      state.nhomQuyen.data = (action.payload as Service.PageResponse<UserApi.Role>)?.data?.list;
      state.nhomQuyen.hasData = true;
    });
  }
});

export const { setUserInfo, setUserConfig } = authSlice.actions;

export default authSlice.reducer;
