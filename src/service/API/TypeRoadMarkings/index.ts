import { TypeRoadMarkings } from './types';
import { categoryHttp } from '@/service';

export const getListRoadMarkings = (params: { page: number; size: number }) => {
  return categoryHttp.get<Service.PageResponse<TypeRoadMarkings>>({
    url: '/v1/road-markings',
    params: params
  });
};
export const getDetailRoadMarkings = (id: number) => {
  return categoryHttp.get<Service.PageResponse<TypeRoadMarkings>>({
    url: `/v1/road-markings/${id}`
  });
};
export const createRoadMarkings = (body: any) => {
  return categoryHttp.post<Service.PageResponse<TypeRoadMarkings>>({
    url: '/v1/road-markings',
    data: body
  });
};
export const updateRoadMarkings = (body: any) => {
  return categoryHttp.put<Service.PageResponse<TypeRoadMarkings>>({
    url: `/v1/road-markings/${body.id}`,
    data: body
  });
};
export const deleteRoadMarkings = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<TypeRoadMarkings>>({
    url: `/v1/road-markings/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/road-markings/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};

