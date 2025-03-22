import { nanoid } from 'nanoid';
import { ChiTietLichSuCapNhat } from './types';

export const fakeDataLichSuCapNhat: ChiTietLichSuCapNhat[] = [
  {
    id: nanoid(36),
    ngayCapNhat: '2024-10-28',
    maLoaiNguoiDung: nanoid(36),
    tenLoaiNguoiDung: 'lãnh đạo',
    maChucNang: nanoid(36),
    tenChucNang: 'Cập nhật dữ liệu hồ sơ hiện hành',
    noiDung: `Cập nhật bổ sung chức năng Cập nhật dữ liệu hồ sơ hiện hành`,
    maMucHDSD: nanoid(36),
    tenMucHDSD: 'Phần V: Hướng dẫn cập nhật dữ liệu hồ sơ hiện hành'
  }
];
