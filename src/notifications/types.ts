import {
  NotificationEnums,
  NotificationPriorityEnums,
  NotificationStatusEnums,
  NotificationStrategyEnums
} from '@/constants/enums';
import { NotificationApi } from '@/service/API';

export interface NotificationSendRequest
  extends Pick<NotificationApi.RequestBodyNotification, 'content' | 'receivers' | 'url'> {
  type?: NotificationEnums;
  sendAll?: NotificationStrategyEnums;
  priority?: NotificationPriorityEnums;
  sendDate?: string;
  status?: NotificationStatusEnums;
}
