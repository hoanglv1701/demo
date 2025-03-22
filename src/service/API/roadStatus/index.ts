import path from 'path';
import { RoadLevel, RoadStatus } from './types';
import { categoryHttp } from '@/service';

export const getList = (params: { page: number; size: number }) => {
  return categoryHttp.get<Service.PageResponse<RoadStatus>>({
    url: '/v1/road-status/list',
    params: params
  });
};

export const getListChildren = (params: { page: number; size: number; roadStatusId: number }) => {
  return categoryHttp.get<Service.PageResponse<RoadStatus>>({
    url: '/v1/road-level/list',
    params: params
  });
};

export const getListCategory = (params: { page: number; size: number }, contextPath: string) => {
  return categoryHttp.get<Service.PageResponse<any>>({
    url: `/v1/category/${contextPath}`,
    params: params
  });
};

export const createCategory = (body: { name: string; description: string }, contextPath: string) => {
  return categoryHttp.post<Service.PageResponse<any>>({
    url: `/v1/category/${contextPath}`,
    data: body
  });
};

export const getDetail = (id: string) => {
  return categoryHttp.get<Service.PageResponse<RoadLevel>>({
    url: `/v1/road-status/${id}`
  });
};

export const create = (body: { name: string; description: string }) => {
  return categoryHttp.post<Service.PageResponse<RoadStatus>>({
    url: '/v1/road-status',
    data: body
  });
};

export const update = (body: { name: string; description: string }) => {
  return categoryHttp.put<Service.PageResponse<RoadStatus>>({
    url: '/v1/road-status',
    data: body
  });
};
export const deletes = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<RoadStatus>>({
    url: `/v1/road-status/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/road-status/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};

export const createRoadLevel = (body: any) => {
  return categoryHttp.post<Service.PageResponse<RoadLevel>>({
    url: '/v1/road-level',
    data: body
  });
};
export const updateRoadLevel = (body: any) => {
  return categoryHttp.put<Service.PageResponse<RoadLevel>>({
    url: '/v1/road-level',
    data: body
  });
};
export const deletesRoadLevel = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<RoadLevel>>({
    url: `/v1/road-level/${id}`
  });
};
export const getDetailRoadLevel = (id: string) => {
  return categoryHttp.get<Service.PageResponse<RoadLevel>>({
    url: `/v1/road-level/${id}`
  });
};

export const getRoadStatus = () => {
  return categoryHttp.get<Service.Response<any>>({
    url: `/v1/road-level/get-all`
  });
};
