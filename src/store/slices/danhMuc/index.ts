import { createSlice } from '@reduxjs/toolkit';
import { DANH_MUC_MANAGER } from '../../config';
import { getDanhMucGioiTinh, getDanhMucThanhPho } from './services';
import { DanhMucState } from './types';
import { SESSION_STORAGE } from '@/constants/common';
import { DanhMucEnums } from '@/constants/enums';
import { DanhMucApi } from '@/service/API';
import { RootState } from '@/store';
import { isObject } from '@/utilities/typeof';

const initialState: DanhMucState = {
  [DanhMucEnums.ThanhPho]: {
    hasData: false,
    data: []
  },
  [DanhMucEnums.GioiTinh]: {
    hasData: false,
    data: []
  }
};

export const danhMucSlice = createSlice({
  name: DANH_MUC_MANAGER,
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDanhMucThanhPho.fulfilled, (state, action) => {
      const danhMucThanhPho = (action.payload as Service.PageResponse<DanhMucApi.DanhMucDiaDiem>).data.list;
      state[DanhMucEnums.ThanhPho].data = danhMucThanhPho;
      state[DanhMucEnums.ThanhPho].hasData = true;
      updateDanhMucSession(DanhMucEnums.ThanhPho, danhMucThanhPho);
    });
    builder.addCase(getDanhMucGioiTinh.fulfilled, (state, action) => {
      const danhMucGioiTinh = (action.payload as Service.PageResponse<DanhMucApi.DanhMucDiaDiem>).data.list;
      state[DanhMucEnums.GioiTinh].data = danhMucGioiTinh;
      state[DanhMucEnums.GioiTinh].hasData = true;
      updateDanhMucSession(DanhMucEnums.GioiTinh, danhMucGioiTinh);
    });
  }
});

function updateDanhMucSession(danhMucKey: DanhMucEnums, value?: any[]) {
  const danhMucSessionJson = sessionStorage.getItem(SESSION_STORAGE.DANH_MUC);
  const danhMucObjInSession = danhMucSessionJson ? JSON.parse(danhMucSessionJson) : {};
  const isValidDanhMucObj = isObject(danhMucObjInSession);
  if (!isValidDanhMucObj) return;

  const hasDataInDanhMuc = !!danhMucObjInSession?.[danhMucKey];
  if (hasDataInDanhMuc) return;

  danhMucObjInSession[danhMucKey] = value;
  sessionStorage.setItem(SESSION_STORAGE.DANH_MUC, JSON.stringify(danhMucObjInSession));
}

export const danhMucStore = (state: RootState) => state[DANH_MUC_MANAGER];
export const { setData } = danhMucSlice.actions;

export default danhMucSlice.reducer;
