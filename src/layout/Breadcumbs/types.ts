export interface HeaderProps {
  onChange: (newState: boolean) => void;
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
}

export interface PopoverNotificationProps {
  children: React.ReactNode;
}

export interface PopoverNotificationRef {
  getUnreadNotificationsCount: () => Promise<void>;
}
