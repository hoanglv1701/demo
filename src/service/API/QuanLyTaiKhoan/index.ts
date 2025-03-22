
import { webHttp } from '@/service';
import { RoleDataResponse } from './types';

const URL = import.meta.env.VITE_USER_API_URL;

export const apiGetDanhSach = async (body: any) => {
  try {
    const res = await webHttp.post<any>({ // fake tạm do be k trả theo cấu trúc
      url: `${URL}/api/user/search`,
      data: body
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiTao = async (data: any) => {
  try {
    const res = await webHttp.post<any>({
      url: `${URL}/api/user`, data
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiSua = async (data: any) => {
  try {
    const res = await webHttp.put<any>({
      url: `${URL}/api/user/${data.id}`, data
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiXoa = async (data: any) => {
  try {
    const res = await webHttp.delete<any>({
      url: `${URL}/api/user/${data}`
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiChiTiet = async (params: string) => {
  try {
    const res = await webHttp.get<any>({
      url: `${URL}/api/user/${params}`
    });
    return res;
  } catch (error) {
    throw error;
  }
};


export const apiGetDanhSachQuyen = async () => {
  try {
    const res = await webHttp.get<any>({ // fake tạm do be k trả theo cấu trúc
      url: `${URL}/api/roles/tree`
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiGetDanhSachDonVi = async () => {
  try {
    const res = await webHttp.get<any>({
      url: `${URL}/api/roles/tree`
    });
    return res;
  } catch (error) {
    throw error;
  }
};
