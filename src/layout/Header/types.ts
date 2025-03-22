export interface HeaderProps {
  onChange: (newState: boolean) => void;
  onChangeMenu: (newState: boolean) => void;
}

export interface HeaderRef {
  updateCollapse: (newState: boolean) => void;
}

export interface ModalChangePasswordProps {
  open: boolean;
  onClose: () => void;
  isFirst?: boolean;
  title?: string
}

export interface ModalThongTinCaNhanProps {
  open: boolean;
  onClose: () => void;
  dataUser: dataUser;
}

export interface dataUser {
  id: string;
  username: string;
  fullName: string;
  positionName: string;
  militaryName: string;
  email: string;
  groupNames: string[];
  groupIds: string[];
  phone: string;
  des: string;
  unitManagement: string;
  position: string;
  nameUnitManagement: string;
}


export interface PopoverNotificationProps {
  children: React.ReactNode;
}

export interface PopoverNotificationRef {
  getUnreadNotificationsCount: () => Promise<void>;
}

export interface MenuProps {
  onChangeMenu: (newState: boolean) => void;
}
