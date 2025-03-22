import { NotificationSendRequest } from '../types';
import {
  NotificationEnums,
  NotificationPriorityEnums,
  NotificationStatusEnums,
  NotificationStrategyEnums
} from '@/constants/enums';
import { NotificationApi } from '@/service/API';
import { store } from '@/store';
import { UserState } from '@/store/slices/auth';

export const sendNotify = ({
  type = NotificationEnums.ThongBao,
  sendAll = NotificationStrategyEnums.ONLY_RECEIVERS,
  priority = NotificationPriorityEnums.MEDIUM,
  sendDate = new Date().toISOString(),
  status = NotificationStatusEnums.Unseen,
  content,
  receivers,
  url
}: NotificationSendRequest) => {
  try {
    const userState = store.getState().authManager as UserState;
    const sender = userState?.userInfo?.detail.account;
    if (!sender) return;

    NotificationApi.sendNotification({
      content: content,
      priority,
      receivers,
      sendAll,
      type,
      sendDate,
      status,
      sender,
      title: 'Tieeu ddeef',
      url
    });
  } catch (_) {
    //
  }
};
