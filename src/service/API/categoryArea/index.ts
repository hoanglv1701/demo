import { CategoryArea } from './types';
import { categoryHttp } from '@/service';

export const getListAreaCategory = (params: { page: number; size: number }) => {
  return categoryHttp.get<Service.PageResponse<CategoryArea>>({
    url: '/v1/category-area/list',
    params: params
  });
};
export const getDetailAreaCategory = (id: number) => {
  return categoryHttp.get<Service.PageResponse<CategoryArea>>({
    url: `/v1/category-area/${id}`
  });
};
export const createAreaCategory = (body: any) => {
  return categoryHttp.post<Service.PageResponse<CategoryArea>>({
    url: '/v1/category-area',
    data: body
  });
};
export const updateAreaCategory = (body: any) => {
  return categoryHttp.put<Service.PageResponse<CategoryArea>>({
    url: '/v1/category-area',
    data: body
  });
};
export const deleteAreaCategory = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<CategoryArea>>({
    url: `/v1/category-area/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/category-area/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};
