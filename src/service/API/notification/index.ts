import { Notification, RequestBodyNotification, SearchNotificationParams } from './types';
import { notificationHttp } from '@/service';
import { isDev } from '@/utilities/env';

export type { SearchNotificationParams, Notification, RequestBodyNotification };

export const getUnreadNotifications = ({ top }: { top: number }) => {
  return notificationHttp.get<Service.PageResponse<Notification>>({
    url: `/api/v1/notification/getTopAndCountUnread?top=${top}`
  });
};

export const getNotifications = ({ page = 0, size = 99, ...rest }: SearchNotificationParams) => {
  return notificationHttp.get<Service.PageResponse<Notification>>({
    url: '/api/v1/notification/listv2',
    params: { page, size, ...rest }
  });
};

export const sendNotification = (data: RequestBodyNotification) => {
  return notificationHttp.post<Service.PageResponse<Notification>>(
    {
      url: '/api/v1/notification/send',
      data
    },
    {
      retryRequest: {
        count: 5,
        isOpenRetry: true,
        waitTime: 1000
      },
      errorMessageMode: 'none',
      successMessageMode: 'none'
    }
  );
};

export const getUnreadNotificationsCount = () => {
  return notificationHttp.get<Service.Response<number>>({
    url: '/api/v1/notification/unread'
  });
};

export const getUnreadMailsCount = () => {
  return notificationHttp.get<Service.Response<number>>({
    url: `/api/v1/mail/inbox/unread`
  });
};

export const markNoti = (id: string) => {
  return notificationHttp.put<Service.Response<any>>({
    url: `/api/v1/notification/mark-read`,
    data: [id]
  });
};

export const markAllNoti = () => {
  return notificationHttp.put<Service.Response<any>>({
    url: `/api/v1/notification/read-all`
  });
};

export const logoutNoti = () => {
  if (isDev) return;
  return notificationHttp.get<Service.Response<any>>({
    url: `/api/v1/user-event/log-out`
  });
};
