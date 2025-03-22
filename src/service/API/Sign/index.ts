import { Sign } from './types';
import { categoryHttp } from '@/service';

export const getListSign = (body: any) => {
  return categoryHttp.post<Service.PageResponse<Sign>>({
    url: '/v1/signage/search',
    data: body
  });
};
export const getDetailSign = (id: number) => {
  return categoryHttp.get<Service.PageResponse<Sign>>({
    url: `/v1/signage/detail/${id}`
  });
};
export const createSign = (body: any) => {
  return categoryHttp.formData<Service.PageResponse<Sign>>({
    url: '/v1/signage',
    data: body
  });
};
export const updateSign = (body: any) => {
  return categoryHttp.formData<Service.PageResponse<Sign>>({
    url: '/v1/signage',
    data: body
  });
};
export const deleteSign = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<Sign>>({
    url: `/v1/signage/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFilePost(
    { url: '/v1/signage/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};

