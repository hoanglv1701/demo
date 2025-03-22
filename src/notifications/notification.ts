import { sendNotify } from './helpers/noti';

//TODO: để BE gửi thông báo, tính năng này cần gửi cho lãnh đạo ở đơn vị khác, tài khoản đăng nhập chỉ có quyền lấy username lãnh đạo quản lý trực tiếp
export const sendNoti = async (data: any) => {
  sendNotify({
    content: 'Teet messs',
    receivers: ['nguoi nhan'],
    url: `/tesst`
  });
};
