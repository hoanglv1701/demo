import { BigBridge } from './types';
import { categoryHttp } from '@/service';

export const getListBigBridge = (params: { page: number; size: number }) => {
  return categoryHttp.get<Service.PageResponse<BigBridge>>({
    url: '/v1/big-bridge',
    params: params
  });
};
export const getDetailBigBridge = (id: number) => {
  return categoryHttp.get<Service.PageResponse<BigBridge>>({
    url: `/v1/big-bridge/${id}`
  });
};
export const createBigBridge = (body: any) => {
  return categoryHttp.post<Service.PageResponse<BigBridge>>({
    url: '/v1/big-bridge',
    data: body
  });
};
export const updateBigBridge = (body: any) => {
  return categoryHttp.put<Service.PageResponse<BigBridge>>({
    url: `/v1/big-bridge`,
    data: body
  });
};
export const deleteBigBridge = (id: string) => {
  return categoryHttp.delete<Service.PageResponse<BigBridge>>({
    url: `/v1/big-bridge/${id}`
  });
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/big-bridge/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};

export const getTypeBridge = () => {
  return categoryHttp.get<Service.PageResponse<BigBridge>>({
    url: `/v1/category/big-bridge-type`,
    params: {
      page: 0,
      size: 100
    }
  });
};

export const getListPillarBridge = (id: number) => {
  return categoryHttp.get<Service.PageResponse<BigBridge>>({
    url: `/v1/big-bridge/${id}/bridge-pillar`
  });
};
