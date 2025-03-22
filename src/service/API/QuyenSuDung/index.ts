import { userHttp } from '@/service';

const URL = import.meta.env.VITE_USER_API_URL;

export const apiGetTreeDanhSachQuyen = async (params: string) => {
  try {
    const res = await userHttp.get<Service.Response<any>>({
      url: `${URL}/api/roles/tree?type=${params}`
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetDanhSachQuyen = async () => {
  try {
    const res = await userHttp.get<Service.Response<any>>({
      url: `${URL}/api/roles`
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetDanhSach = async (data: any) => {
  try {
    const res = await userHttp.post<Service.Response<any>>({
      url: `${URL}/api/groups/search`,
      data
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiTao = async (data: any) => {
  try {
    const res = await userHttp.post<Service.Response<any>>({
      url: `${URL}/api/groups`,
      data
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiSua = async (data: any) => {
  try {
    const res = await userHttp.put<Service.Response<any>>({
      url: `${URL}/api/groups/${data.id}`,
      data
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiXoa = async (data: any) => {
  try {
    const res = await userHttp.delete<Service.Response<any>>({
      url: `${URL}/api/groups/${data}`
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const apiChiTiet = async (params: string) => {
  try {
    const res = await userHttp.get<Service.Response<any>>({
      url: `${URL}/api/groups/${params}`
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const exportExcel = ({ ...rest }) => {
  return userHttp.downloadFile(
    { url: '/api/groups/export', data: { ...rest }, method: 'POST' },
    { saveAs: true, noMessage: true }
  );
};
