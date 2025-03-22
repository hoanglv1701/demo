declare namespace Model {
  interface Page<T> {
    map(arg0: (x: any, index: number) => any): unknown;
    list: T[];
    content: T[];
    total: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
  }

  interface BasicInfo {
    createdDate?: number;
    createdBy?: string;
    lastModifiedDate?: number;
    lastModifiedBy?: string;
  }

  interface PerSon {
    hoVaTen: string;
    namSinh: string;
    gioiTinh: string;
    soCCCD: string;
    noiThuongTru: string;
    ngheNghiep: string;
    thongTinKhac: string;
    trangThai: string;
  }

  export interface BasicDataTable {
    total?: number;
    content?: any[];
  }

  export interface HoSoPhoiHopDTOS {
    id: string;
    loaiHsPhoiHop: string;
    noiDung: string;
    soDangKy: string;
    maDonVi: string;
    tenDonVi: string;
  }

  export interface HoSoPhoiHopVOS extends HoSoPhoiHopDTOS {
    idHs: string;
    idHsChuTri: string;
    trichYeu: string;
    cbQuanLy: string;
  }

  interface DienBienHoSo {
    id: string;
    idHs?: string;
    maDienBien?: DienBienHoSoEnums;
    tenDienBien: string;
    tenCbQuanLy: string;
    ngaySua: string;
    tenTrangThai: string;
    maTrangThai: TrangThaiTrinhKyEnums;
  }

  interface DiaChiDTO {
    maXaDktt?: string;
    tenXaDktt?: string;
    maXaNoiCuTru?: string;
    tenXaNoiCuTru?: string;
    maXaQueQuan?: string;
    tenXaQueQuan?: string;
    maHuyenDktt?: string;
    tenHuyenDktt?: string;
    maHuyenNoiCuTru?: string;
    tenHuyenNoiCuTru?: string;
    maHuyenQueQuan?: string;
    tenHuyenQueQuan?: string;
    maTinhDktt?: string;
    tenTinhDktt?: string;
    maTinhNoiCuTru?: string;
    tenTinhNoiCuTru?: string;
    maTinhQueQuan?: string;
    tenTinhQueQuan?: string;
    maQuocGiaQueQuan?: string;
    maQuocGiaDktt?: string;
    maQuocGiaNoiCuTru?: string;
    tenQuocGiaQueQuan?: string;
    tenQuocGiaDktt?: string;
    tenQuocGiaNoiCuTru?: string;
    dktt?: string;
    queQuan?: string;
    noiCuTru?: string;
  }

  export interface ThongTinCaNhanDTO extends DiaChiDTO {
    id?: string;
    biDanh?: string;
    cccd: string;
    choOHienNay?: string;
    cmnd?: string;
    hoChieu?: string;
    hoTen: string;
    hoTenKhac?: string;
    lyLuanChinhTri?: string;
    maDanToc?: string;
    tenDanToc?: string;
    maDangPhai?: string;
    tenDangPhai?: string;
    maNgheNghiep?: string;
    tenNgheNghiep?: string;
    tenNgoaiNgu?: string;
    tenNgonNgu?: string;
    maQuocGia?: string;
    tenQuocGia?: string;
    maQuocTich?: string;
    tenQuocTich?: string;
    maTonGiao?: string;
    tenTonGiao?: string;
    maChucSac?: string;
    tenChucSac?: string;
    tenTrinhDoVanHoa?: string;
    ngayCapCccd?: string;
    ngayCapCmnd?: string;
    ngayCapHoChieu?: string;
    ngaySinh: string;
    noiCapCccd?: string;
    noiCapCmnd?: string;
    noiCapHoChieu?: string;
    noiLamViec?: string;
    thongTinNgheNghiep?: string;
    maTrinhDoChuyenMon?: string;
    tenTrinhDoChuyenMon?: string;
    anhDtBase64?: string;
    tenAnhDt?: string;
    maGioiTinh: string;
    tenGioiTinh: string;
    maChucVu?: string;
    tenChucVu?: string;
    hoTenCha?: string;
    ngaySinhCha?: string;
    hoTenMe?: string;
    ngaySinhMe?: string;
    hoTenVoChong?: string;
    ngaySinhVoChong?: string;
    thongTinKhac?: string;
    maPhanLoai?: string;
    pidConNguoiDanCu?: string;
    dsHoTenKhac?: ThongTinKhacAddonDTO[];
    dsCCCDKhac?: ThongTinKhacAddonDTO[];
    dsNgaySinhKhac?: ThongTinKhacAddonDTO[];
    dsQuocTichKhac?: ThongTinKhacAddonDTO[];
    dsHoTenChaKhac?: ThongTinKhacAddonDTO[];
    dsHoTenMeKhac?: ThongTinKhacAddonDTO[];
    dsHoTenVoChongKhac?: ThongTinKhacAddonDTO[];
    dsQueQuanKhac?: DiaChiKhacAddonDTO[];
    dsChoOHienNayKhac?: DiaChiKhacAddonDTO[];
  }

  export interface ThongTinKhacAddonDTO {
    id?: string;
    maGiaTri?: string;
    tenGiaTri: string;
    loaiGiaTri: ThongTinKhacTypeAddOnEnums;
  }

  export interface DiaChiKhacAddonDTO {
    id?: string;
    maQuocGia: string;
    tenQuocGia: string;
    maTinh?: string;
    tenTinh?: string;
    maHuyen?: string;
    tenHuyen?: string;
    maXa?: string;
    tenXa?: string;
    chiTietDiaDiem?: string;
    loaiDiaDiem: DiaChiKhacAddOnTypeEnums;
  }

  export interface DacDiemNhanDangDTO {
    id?: string;
    idThongTinCaNhan?: string;
    canNang?: string;
    chieuCao?: string;
    dauVetRieng?: string;
    maDacDiem?: string;
    tenDacDiemCam?: string;
    maDacDiemKhuonMat?: string;
    tenDacDiemKhuonMat?: string;
    tenDacDiemMieng?: string;
    maDacDiemMui?: string;
    tenDacDiemMui?: string;
    tenDacDiemRang?: string;
    maDacDiemTai?: string;
    tenDacDiemTai?: string;
    maDacDiemTran?: string;
    tenDacDiemTran?: string;
    mauDa?: string;
    mauMat?: string;
    mauToc?: string;
    moi?: string;
    noiDungDacDiem?: string;
    soThich?: string;
    tenDacDiem?: string;
    vocDang?: string;
    khaNangDacBiet?: string;
  }

  export interface QuanHeGiaDinhDTO {
    id?: string;
    maChucVu?: string;
    tenChucVu?: string;
    hoTen: string;
    hoTenKhac?: string;
    maQuanHe: string;
    tenQuanHe: string;
    namSinh?: string;
    maNgheNghiep?: string;
    tenNgheNghiep?: string;
    noiCuTru?: string;
    noiLamViec?: string;
  }

  export interface QuanHeXaHoiDTO {
    id?: string;
    quanHe?: string;
    maChucVu?: string;
    tenChucVu?: string;
    hoTen?: string;
    hoTenKhac?: string;
    namSinh?: string;
    maGioiTinh?: string;
    tenGioiTinh?: string;
    maNgheNghiep?: string;
    tenNgheNghiep?: string;
    nguonTin?: string;
    noiCuTru?: string;
    noiLamViec?: string;
  }

  export interface TienAnTienSuDTO {
    id?: string;
    coQuanXuLy: string;
    tenToiDanh: string;
    mucDoXuLy: string;
    nguonTin?: string;
    thoiGian: string;
  }

  export interface QuaTrinhHoatDongDTO {
    id?: string;
    nguonTin?: string;
    thoiGian: string;
    thongTinNgheNghiep: string;
  }

  export interface HoatDongHienHanhDTO {
    id?: string;
    nguonTin?: string;
    noiDung: string;
    thoiGian: string;
  }
}

declare namespace Param {
  interface PageParams {
    page: number;
    size: number;
  }

  interface SearchListQueryParams extends PageParams {
    tuKhoaTimKiem?: string;
    sort?: string[];
    ngayLapTuNgay?: string;
    ngayLapDenNgay?: string;
    ngayDangKyTuNgay?: string;
    ngayDangKyDenNgay?: string;
    ngayTiepNhanTuNgay?: string;
    ngayTiepNhanDenNgay?: string;
    isQuanLyTrucTiep?: boolean;
    listPhoiHopChuTri?: boolean;
  }

  type PartialSearchListQueryParams<T> = Omit<Partial<T>, keyof Model.BasicInfo> & Partial<SearchListQueryParams>;
}

declare namespace Service {
  /**
   * Requested error type:
   * - axios: axios error: network error, request timeout, default catch-all error
   * - http: the request is successful, and the response http status code is not a 200 error
   * - backend: The request is successful, the HTTP status code of the response is 200, and the business error defined by the backend
   */
  type RequestErrorType = 'axios' | 'http' | 'backend';

  type ErrorMessageMode = 'none' | 'modal' | 'message' | 'notification';
  type SuccessMessageMode = ErrorMessageMode;

  /** request error */
  interface RequestError {
    /** The error type of the requested service */
    type: RequestErrorType;
    /** error code */
    code: string | number;
    /** error message */
    msg: string;
  }

  interface BackendErrorResult {
    [key: string]: any;
    type: string;
    code: string;
    message?: string;
  }

  interface Response<T> {
    [key: string]: any;
    data: T;
    messageCode: string;
    message?: string;
  }

  interface PageResponse<T> extends Omit<Response<T>, 'data'> {
    data: Model.Page<T>;
  }

  /** Data structure configuration returned by the backend interface */
  interface BackendResultConfig {
    /** Indicates the attribute field of the backend request status code */
    codeKey: string;
    /** Indicates the attribute field of the backend request data */
    dataKey: string;
    /** Indicates the attribute field of the backend message */
    msgKey: string;
    /** The status of the successful request defined on the backend business */
    successCode: number | string;
  }

  /** mock response option */
  interface MockOption {
    url: Record<string, any>;
    body: Record<string, any>;
    query: Record<string, any>;
    headers: Record<string, any>;
  }
}

declare namespace Common {
  /**
   * Strategy mode
   * [status, callback function executed when true]
   */
  type StrategyAction = [boolean, () => void];

  /** option data */
  type OptionWithKey<K> = { value: K; label: string };

  type MenuItemWithData = { key: string; label?: string | ReactNode; data?: any };

  type EmitEvent<T = any> = {
    visible: boolean;
    data?: T;
  };
}

type StringOrNumber = string | number;
