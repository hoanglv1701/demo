import { DanhMucEnums } from '@/constants/enums';
import {  DanhMucApi } from '@/service/API';

export interface DanhMucItem<T> {
  data: T[];
  hasData: boolean;
}
export interface DanhMucState {
  [DanhMucEnums.ThanhPho]: DanhMucItem<DanhMucApi.DanhMucDiaDiem>;
  [DanhMucEnums.GioiTinh]: DanhMucItem<DanhMucApi.DanhMucGioiTinh>;
}
