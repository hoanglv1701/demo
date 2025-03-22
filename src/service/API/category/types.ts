export interface DanhMucBase extends Model.BasicInfo {
  id: string;
  name: string;
  code?: string;
  status?: number;
  description: string;
  displayName?: string;
  order?: string;
  statusName?: string;
}

export interface DanhMucConfig {
  id: string;
  ma: string;
  ten: string;
  maCha: string;
  existChild: number;
}

export interface DanhMucGioiTinh extends DanhMucBase { }
export interface Category extends DanhMucBase { }

