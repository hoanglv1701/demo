export enum StatusEnums {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Delete = 'DELETE'
}

export enum NotificationEnums {
  ThongBao = '1',
  CanhBao = '2'
}

export enum NotificationStatusEnums {
  Seen = '3',
  Unseen = '2'
}

export enum NotificationStrategyEnums {
  SEND_ALL = '1',
  ONLY_RECEIVERS = '0'
}

export enum NotificationPriorityEnums {
  HIGH = '1',
  MEDIUM = '0'
}

export enum CollapsedStatusEnums {
  Collapsed = 1,
  Expanded = 0
}

export enum DanhMucEnums {
  ThanhPho = 'danhMucThanhPho',
  GioiTinh = 'danhMucGioiTinh'
}

export enum FileTypeEnums {
  Doc = 'doc',
  Pdf = 'pdf',
  Image = 'img',
  File = 'file',
  Excel = 'xlsx',
  Video = 'video',
  Audio = 'audio'
}

export enum SortOrderEnums {
  LongAscend = 'ascend',
  ShortAscend = 'asc',
  LongDescend = 'descend',
  ShortDescend = 'desc'
}
