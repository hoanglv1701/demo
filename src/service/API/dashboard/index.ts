import { ListHoSoDetail } from './types';
import { webHttp } from '@/service';

export type { ListHoSoDetail };

export const getListHoSo = ({ page = 1, size = 99, ...rest }: Param.SearchListQueryParams) => {
  return webHttp.get<Service.PageResponse<ListHoSoDetail>>({
    url: '/canh-bao/ho-so',
    params: { page, size, ...rest }
  });
};
