import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { BaseDatePickerProps, BaseRangePickerProps } from '@/components/Atoms';
import { PAGE_SIZE } from '@/utilities/pagination';

dayjs.extend(quarterOfYear).locale('vi');

export const LOCAL_STORAGE = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  EXPIRES_IN: 'expires_in',
  SESSION_STATE: 'session_state',
  COLLAPSED_MENU: 'collapsedMenu',
  SCHEDULE_ON: 'scheduleOn',
  FIRST_LOGIN: 'firstLogin',
  REFRESH_EXPIRES_IN: 'refresh_expires_in',
  USER_INFO: 'userInfo',
};

export const SCHEDULE_ON_STATUS = '1';

export const SESSION_STORAGE = {
  DANH_MUC: 'danhMuc'
};

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

export const STATUS = {
  SUCCESS: '200'
};

export const MAX_BIEU_MAU_UPLOAD_SIZE_MB = 100;
export const MAX_CHUNK_SIZE_BYTES = 2500000; //2.5mb

export const DEFAULT_PAGE_PARAMS = {
  page: 1,
  size: PAGE_SIZE,
  sort: ['ngayTao,desc']
};

export const pastRangePresets: BaseRangePickerProps['presets'] = [
  { label: 'Tuần này', value: [dayjs().startOf('week'), dayjs()] },
  {
    label: 'Tuần trước',
    value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')]
  },
  { label: 'Tháng này', value: [dayjs().startOf('month'), dayjs()] },
  {
    label: 'Tháng trước',
    value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  },
  { label: 'Quý này', value: [dayjs().startOf('quarter'), dayjs()] },
  {
    label: 'Quý trước',
    value: [dayjs().subtract(1, 'quarter').startOf('quarter'), dayjs().subtract(1, 'quarter').endOf('quarter')]
  },
  { label: 'Năm này', value: [dayjs().startOf('year'), dayjs()] },
  {
    label: 'Năm trước',
    value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
  }
];

export const futureRangePresets: BaseRangePickerProps['presets'] = [
  { label: 'Tuần này', value: [dayjs(), dayjs().endOf('week')] },
  {
    label: 'Tuần tới',
    value: [dayjs().add(1, 'week').startOf('week'), dayjs().add(1, 'week').endOf('week')]
  },
  { label: 'Tháng này', value: [dayjs(), dayjs().endOf('month')] },
  {
    label: 'Tháng tới',
    value: [dayjs().add(1, 'month').startOf('month'), dayjs().add(1, 'month').endOf('month')]
  },
  { label: 'Quý này', value: [dayjs(), dayjs().endOf('quarter')] },
  {
    label: 'Quý tới',
    value: [dayjs().add(1, 'quarter').startOf('quarter'), dayjs().add(1, 'quarter').endOf('quarter')]
  },
  { label: 'Năm này', value: [dayjs(), dayjs().endOf('year')] },
  {
    label: 'Năm tới',
    value: [dayjs().add(1, 'year').startOf('year'), dayjs().add(1, 'year').endOf('year')]
  }
];

export const pastDatePresets: BaseDatePickerProps['presets'] = [
  { label: 'Hôm nay', value: dayjs() },
  { label: 'Hôm qua', value: dayjs().subtract(1, 'day') },
  { label: 'Tuần trước', value: dayjs().subtract(1, 'week') },
  { label: 'Tháng trước', value: dayjs().subtract(1, 'month') },
  { label: 'Quý trước', value: dayjs().subtract(1, 'quarter') },
  { label: 'Năm trước', value: dayjs().subtract(1, 'year') }
];

export const futureDatePresets: BaseDatePickerProps['presets'] = [
  { label: 'Hôm nay', value: dayjs() },
  { label: 'Ngày mai', value: dayjs().add(1, 'day') },
  { label: 'Tuần tới', value: dayjs().add(1, 'week') },
  { label: 'Tháng tới', value: dayjs().add(1, 'month') },
  { label: 'Quý tới', value: dayjs().add(1, 'quarter') },
  { label: 'Năm tới', value: dayjs().add(1, 'year') }
];

export const thangOptions = [
  {
    label: '01',
    value: 1
  },
  {
    label: '02',
    value: 2
  },
  {
    label: '03',
    value: 3
  },
  {
    label: '04',
    value: 4
  },
  {
    label: '05',
    value: 5
  },
  {
    label: '06',
    value: 6
  },
  {
    label: '07',
    value: 7
  },
  {
    label: '08',
    value: 8
  },
  {
    label: '09',
    value: 9
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '11',
    value: 11
  },
  {
    label: '12',
    value: 12
  }
];
export const RoadMarkingsOptionType = [
  {
    label: 'Vạch dọc đường đơn',
    value: 'LONGITUDINAL_SINGLE_LINE'
  },
  {
    label: 'Vạch dọc đường đôi',
    value: 'LONGITUDINAL_DOUBLE_LINE'
  },
  {
    label: 'Vạch đi bộ',
    value: 'WALKING_LINE'
  },
  {
    label: 'Vạch giảm tốc',
    value: 'SPEED_REDUCTION'
  },
  {
    label: 'Vạch hình thoi',
    value: 'DIAMOND_MARKING'
  },
  {
    label: 'Vạch mũi tên chỉ hướng',
    value: 'DIRECTION_ARROW'
  },
  {
    label: 'Vạch dừng xe',
    value: 'STOP_LINE'
  }
];

export const TypeSign = [
  {
    label: 'Khác',
    value: 'OTHER'
  },
  {
    label: 'Biển báo cấm',
    value: 'PROHIBITION'
  },
  {
    label: 'Biển báo nguy hiểm và cảnh báo',
    value: 'WARNING'
  },
  {
    label: 'Biển hiệu lệnh',
    value: 'MANDATORY'
  },
  {
    label: 'Biển chỉ dẫn trên đường ô tô không phải là đường cao tốc',
    value: 'INFORMATION_NON_HIGHWAY'
  },
  {
    label: 'Biển phụ, biển viết bằng chữ',
    value: 'SUPPLEMENTARY'
  },
  {
    label: 'Biển chỉ dẫn trên đường cao tốc',
    value: 'INFORMATION_HIGHWAY'
  },
  {
    label: 'Tên phố',
    value: 'STREET_NAME'
  },
];

export const ShapeSign = [
  {
    label: 'Biển báo tròn',
    value: 'CIRCULAR'
  },
  {
    label: 'Biển báo bát giác',
    value: 'OCTAGONAL'
  },
  {
    label: 'Biển báo tam giác',
    value: 'TRIANGULAR'
  },
  {
    label: 'Biển báo hình chữ nhật',
    value: 'RECTANGULAR'
  },
];


