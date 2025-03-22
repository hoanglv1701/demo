import { Category } from './types';
import { categoryHttp } from '@/service';

export const getList = (params: { page: number; size: number; keySearch: string | null }, group: string) => {
  return categoryHttp.get<Service.PageResponse<Category>>({
    url: `/v1/category/${group}`,
    params: params
  });
};
export const create = (body: { name: string; description: string }, group: string) => {
  return categoryHttp.post<Service.PageResponse<Category>>({
    url: `/v1/category/${group}`,
    data: body
  });
};
export const update = (body: { name: string; description: string }, group: string) => {
  return categoryHttp.put<Service.PageResponse<Category>>({
    url: `/v1/category/${group}`,
    data: body
  });
};
export const deleteOne = (id: string, group: string) => {
  return categoryHttp.delete<Service.PageResponse<Category>>({
    url: `/v1/category/${group}/${id}`
  });
};

export const exportExcel = (rest: any, group: string) => {
  return categoryHttp.downloadFile(
    { url: `/v1/category/${group}/export`, params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};

export const getGroupList = (params: { page: number; size: number; parentId: number }) => {
  return categoryHttp.get<Service.PageResponse<Category>>({
    url: `/v1/category-group`,
    params: params
  });
};
