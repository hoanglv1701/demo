import { categoryHttp } from '@/service';

export const APP_CODE = `${import.meta.env.VITE_APP_CODE}`;

export const getTree = () => {
  return categoryHttp.get<Service.Response<any>>(
    { url: '/v1/organization' },
    {
      errorMessageMode: 'none'
    }
  );
};

export const getAreas = ({ page = 0, size = 99, ...rest }) => {
  return categoryHttp.get<Service.Response<any>>(
    { url: '/v1/category/area', params: { page, size, ...rest } },
    {
      errorMessageMode: 'none'
    }
  );
};

export const create = (req: any) => {
  return categoryHttp.post<Service.Response<any>>(
    { url: '/v1/organization', data: req },
    {
      errorMessageMode: 'none'
    }
  );
};

export const update = (req: any) => {
  return categoryHttp.put<Service.Response<any>>(
    { url: '/v1/organization', data: req },
    {
      errorMessageMode: 'none'
    }
  );
};

export const detail = (id: number) => {
  return categoryHttp.get<Service.Response<any>>(
    { url: `/v1/organization/${id}` },
    {
      errorMessageMode: 'none'
    }
  );
};

export const deleteOne = (id: number) => {
  return categoryHttp.delete<Service.Response<any>>(
    { url: `/v1/organization/${id}` },
    {
      errorMessageMode: 'none'
    }
  );
};

export const search = ({ page = 0, size = 99, ...rest }) => {
  return categoryHttp.get<Service.Response<any>>(
    { url: '/v1/organization/list', params: { page, size, ...rest } },
    {
      errorMessageMode: 'none'
    }
  );
};

export const exportExcel = ({ ...rest }) => {
  return categoryHttp.downloadFile(
    { url: '/v1/organization/export', params: { ...rest } },
    { saveAs: true, noMessage: true }
  );
};
