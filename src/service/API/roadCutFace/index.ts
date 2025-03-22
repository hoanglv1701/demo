import { categoryHttp } from '@/service';

export const getListCategory = (params: { page: number; size: number }, contextPath: string) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: `/v1/category/${contextPath}`,
    params: params
  });
};

export const getList = (params: {
  page: number;
  size: number;
  name: string;
  routeId: number | null;
  areaId: number | null;
}) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: '/v1/road-distance/list',
    params: params
  });
};

export const getDetail = (id: string) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: `/v1/road-distance/${id}`
  });
};

export const create = (body: any) => {
  return categoryHttp.post<Service.PageResponse<any>>({
    url: '/v1/road-distance',
    data: body
  });
};

export const update = (body: any) => {
  return categoryHttp.put<Service.PageResponse<any>>({
    url: '/v1/road-distance',
    data: body
  });
};
export const deletes = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<any>>({
    url: `/v1/road-distance/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/road-distance/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};
