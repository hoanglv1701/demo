import {
  AuthModel,
  ChangePasswordParams,
  ChuKy,
  LanhDao,
  ParamsGetDanhSachTaiKhoanNguoiDung,
  ParamsSearchLanhDao,
  PasswordRule,
  PhanMemTruyCap,
  Role,
  UserBasic,
  UserConfig,
  UserInfo,
  UserInfoDetail
} from './types';
import { WebHttp8701, WebHttpBase, personHttp, qtudHttp, webHttp } from '@/service';
import { omitNil } from '@/utilities/object';

export type { AuthModel, LanhDao, ParamsSearchLanhDao, Role, UserBasic, UserConfig, UserInfo, UserInfoDetail };
export const APP_CODE = `${import.meta.env.VITE_APP_CODE}`;


export const getMe = () => {
  return WebHttp8701.get<Service.Response<any>>(
    { url: '/api/user/currentUser' },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getMeByAccount = (account: string) => {
  return webHttp.get<Service.Response<UserInfo>>({
    url: 'getMe/getMeByAccount',
    params: {
      account: account
    }
  });
};

export const getChuKy = (userName: string) => {
  return qtudHttp.get<Service.Response<ChuKy>>(
    { url: `/api/v1/account-hsm/${userName}` },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getUserConfig = () => {
  return qtudHttp.get<Service.Response<[]>>(
    { url: `/api/user/current/role-tree` },
    {
      errorMessageMode: 'none'
    }
  );
};

export const searchCanBoDonViDangNhapByKeySearch = async ({
  keySearch,
  page,
  size
}: {
  organization?: string;
  keySearch?: string;
  page: number;
  size: number;
}) => {
  return webHttp.get<Service.PageResponse<UserBasic>>({
    url: '/danh-muc/list-lead-by-org',
    params: omitNil({
      page,
      size,
      keySearch: keySearch
    })
  });
};

export const searchCanBoByKeySearchAndOrg = async ({
  keySearch,
  page,
  size,
  organization
}: {
  organization?: string;
  keySearch?: string;
  page: number;
  size: number;
}) => {
  return webHttp.get<Service.PageResponse<UserBasic & { fullName: string }>>({
    url: '/danh-muc/list-lead-by-org-ban-giao',
    params: omitNil({
      page,
      size,
      keySearch: keySearch,
      organization
    })
  });
};

export const getUsersByAccount = async ({ account }: { account: string }) => {
  return personHttp.get<Service.PageResponse<UserBasic>>({
    url: 'api/v1/account/list',
    params: { page: 0, size: 100, account: account }
  });
};

export const getAllLanhDaosOfCurrentUser = async (params: ParamsSearchLanhDao) => {
  return webHttp.get<Service.PageResponse<LanhDao>>({ url: '/danh-muc/listAccountDirectBottom', params });
};

export const getAllLanhDaosOfOrg = async (params: { organization: string }) => {
  return personHttp.get<Service.PageResponse<UserBasic>>({ url: '/api/v1/account/list-account-lead-by-org', params });
};

export const getPasswordRules = () => {
  return personHttp.get<Service.Response<PasswordRule[]>>({
    url: 'api/v1/general-config/password-rules'
  });
};

export const changePassword = (params: ChangePasswordParams) => {
  return WebHttpBase.post<Service.Response<any>>({
    url: 'api/auth/change-password',
    params: params
  });
};

export const getNhomQuyenCuaTaiKhoan = () => {
  return personHttp.get<Service.PageResponse<Role>>({
    url: '/api/v1/role-group/menu/list'
  });
};

export const getDanhSachTaiKhoanNguoiDung = async (params: ParamsGetDanhSachTaiKhoanNguoiDung) => {
  return webHttp.get<Service.PageResponse<UserBasic>>({
    url: '/danh-muc/account/list',
    params: omitNil({
      ...params,
      page: 0,
      size: 999
    })
  });
};

export const getDanhSachPhanMemTruyCap = async () => {
  return personHttp.get<Service.Response<PhanMemTruyCap[]>>({
    url: 'api/v1/permission/apps'
  });
};

export const exportExcel = ({ ...rest }) => {
  return personHttp.downloadFile(
    { url: '/api/user/export', data: { ...rest }, method: 'POST' },
    { saveAs: true, noMessage: true }
  );
};
