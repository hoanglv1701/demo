import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { DanhMucState } from './types';
import { SESSION_STORAGE } from '@/constants/common';
import { DanhMucEnums } from '@/constants/enums';
import { DanhMucApi } from '@/service/API';
import { RootState } from '@/store';
import { DANH_MUC_MANAGER } from '@/store/config';
import { isArray, isObject } from '@/utilities/typeof';

const _getCurrentState = (
  currentConfig: GetThunkAPI<AsyncThunkConfig>,
  danhMucKey: DanhMucEnums
): { hasData: boolean; data?: any[] } => {
  const state = currentConfig.getState() as RootState;
  const danhMucManagerInRedux = state[DANH_MUC_MANAGER] as DanhMucState;

  const danhMucInRedux = danhMucManagerInRedux[danhMucKey];
  if (danhMucInRedux.hasData) {
    return danhMucInRedux;
  }

  const danhMucManagerSessionJson = sessionStorage.getItem(SESSION_STORAGE.DANH_MUC);
  const hasDanhMucManagerInSession = danhMucManagerSessionJson && isObject(JSON.parse(danhMucManagerSessionJson));
  if (hasDanhMucManagerInSession) {
    const danhMucInSession = JSON.parse(danhMucManagerSessionJson)?.[danhMucKey];
    const isValidDataDanhMuc = isArray(danhMucInSession);

    if (isValidDataDanhMuc) {
      return {
        hasData: true,
        data: danhMucInSession
      };
    }
  }

  return {
    hasData: false,
    data: undefined
  };
};

export const getDanhMucThanhPho = createAsyncThunk('danh-muc/thanh-pho', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.ThanhPho);

  if (hasData) {
    return { data: { list: data } };
  }

  return await DanhMucApi.getDanhMucThanhPho({ areaAdministrativeType: 1, status: 1 });
});

export const getDanhMucGioiTinh = createAsyncThunk('danh-muc/gioi-tinh', async (_, thunkApi) => {
  const { hasData, data } = _getCurrentState(thunkApi, DanhMucEnums.GioiTinh);

  if (hasData) {
    return { data: { list: data } };
  }

  return await DanhMucApi.getDanhMucGioiTinh();
});
