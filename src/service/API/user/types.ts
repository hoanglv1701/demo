import { CapDonViEnums, FetchUsersStrategyEnums, TrucThuocCoQuanHoSoEnums } from '@/constants/enums';

export interface AuthModel {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  firstLogin: Date;
  user_info: string;
}

export interface UserInfo {
  detail: UserInfoDetail;
}

export interface ChuKy {
  account: string;
  signImg: string;
  signImgName: string;
}

export interface UserInfoDetail extends Omit<UserBasic, 'name' | 'status' | 'statusName'> {
  //TODO: check to delete unused fields

  fullName: string;
  dignity: string; //TODO: update enum
  policeNumber: string;
  phone: string;
  organizationParent: string; //TODO: update enum
  organizationParentName: string;
  organizationLevel: CapDonViEnums;
  organizationLevelCode: string;
  gender: string; //TODO: update enum
  genderName: string;
  sign: string;
  isLocal: number;
  provinceCode: string;
  province: string;
  bds_province: string;
  v06: TrucThuocCoQuanHoSoEnums; //TODO: update enum
  pv01: string; //TODO: update enum
  leaderCadres: number; //TODO: update enum
  accountType: number; //TODO: update enum
  directManager: string;
  orgFb: number; //TODO: update enum
  nameAcronym: string;
  nameAcronymD: string;
  updateAt: string;
  listAccountDetailOrgTop: AccountDetailOrgTop[];
  timeOut: string;
  forceSystem: string; //TODO: update enum
  roleMap: number; //TODO: update enum
  passwordStart: string;
  investigativeAgencyType: number; //TODO: update enum
  expiredNotificationDate: Date;
  expirationDate: Date;
  statusConfirmInfo: number; //TODO: update enum
  virtualUser: number; //TODO: update enum
  birthDate?: string;
  address?: string;
  academicLevel?: string;
  politicalLevel?: string;
  signature?: string;
  signImg?: string;
  districtCode?: string;
  district?: string;
  bds_district?: string;
  villageCode?: string;
  village?: string;
  bds_village?: string;
  groupCode?: string;
  reasonRefuse?: string;
  chuKy?: string;
  heLucLuong?: string;
  isV01OrPV01?: boolean;
}

export interface AccountDetailOrgTop {
  id?: string;
  username: string;
  accountName: string;
  organizationCode?: string;
  organizationName?: string;
  type?: string; //TODO: update enum
}

export interface UserAction {
  action: string;
  name: string;
}

export interface UserConfig {
  actions?: UserAction[];
  permissions?: string[];
  listMenuUrl?: string[];
  menuHeader: UserMenuItem[];
  menuSidebar: UserMenuItem[];
}

export interface UserMenuItem {
  id?: string;
  name?: string;
  code?: string;
  typeMenu?: number;
  url?: string;
  iconCls?: string;
  component?: string;
  parentCode?: string;
}

export interface UserMenuTreeItem extends Omit<UserMenuItem, 'parentCode'> {
  selectable: boolean;
  leaf: boolean;
  children: UserMenuTreeItem[];
}

export interface UserBasic {
  id: string;
  name: string;
  account: string;
  organization: string;
  organizationName: string;
  position: string;
  positionName: string;
  military?: string;
  militaryName?: string;
  status: string;
  statusName: string;
  policeNumber?: string;
  phone?: string;
}

export interface LanhDao extends Omit<UserBasic, 'name' | 'account' | 'id' | 'military' | 'position'> {
  accountId: string;
  accountName: string;
  username: string;
  militaryCode: string;
  positionCode: string;
}

export interface ParamsSearchLanhDao {
  position?: string;
  org?: string;
}

export interface PasswordRule {
  key: string;
  text: string;
  description?: string;
  filter?: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}

export interface Role extends Model.BasicInfo {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface ParamsGetDanhSachTaiKhoanNguoiDung extends Partial<UserBasic> {
  keySearch?: string;
  organization?: string;
  organizationRank?: string;
  account?: string;
  name?: string;
  position?: string;
}

export interface GetDanhSachTaiKhoanProps {
  type?: FetchUsersStrategyEnums;
  size?: number;
  org?: string;
}

export interface PhanMemTruyCap {
  code: string;
  logo: string;
  name: string;
  order?: string;
  parentCode?: string;
  url?: string;
}
