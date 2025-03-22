import { categoryHttp } from '@/service';

export const getListCategory = (params: { page: number; size: number }, contextPath: string) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: `/v1/category/${contextPath}`,
    params: params
  });
};

export const getList = (params: { page: number; size: number; name: string | null; roadType: number | null }) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: '/v1/road-route/list',
    params: params
  });
};

export const getDetail = (id: string) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: `/v1/road-route/${id}`
  });
};

export const create = (body: { name: string; description: string }) => {
  return categoryHttp.post<Service.PageResponse<any>>({
    url: '/v1/road-route',
    data: body
  });
};

export const update = (body: { name: string; description: string }) => {
  return categoryHttp.put<Service.PageResponse<any>>({
    url: '/v1/road-route',
    data: body
  });
};
export const deletes = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<any>>({
    url: `/v1/road-route/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/road-route/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};
