import React, { useEffect, useState } from 'react';
import { Col, Flex, Form, message, Row, Tooltip } from 'antd';
import { ModalThongTinCaNhanProps } from '../types';
import { Button, Input, Modal, Textarea, Select } from '@/components/Atoms';
import useAccountLogin from '@/hooks/useAccountLogin';
import Treeselect from '@/components/Atoms/TreeSelect';
import { REGEX_ACCOUNT, REGEXP_EMAIL, REGEXP_PHONE } from '@/config';
import { QuanLyTaiKhoanApi } from '@/service/API';
import { LOCAL_STORAGE } from '@/constants/common';

const ModalThongTinCaNhan: React.FC<ModalThongTinCaNhanProps> = (props) => {
  const { open, onClose, dataUser } = props;
  const [formCreate] = Form.useForm();
  const [loading, setLoading] = useState(false);

  function handleClose() {
    onClose();
  }


  const onFinish = (values: any, isContinue: boolean) => {
    formCreate.validateFields().then(() => {
      let data: any = {
        id: dataUser.id,
        username: dataUser.username,
        fullName: values.fullName,
        email: values.email,
        group: dataUser.groupIds,
        phone: values.phone,
        unitManagement: dataUser.unitManagement,
        position: values.position,
        des: values.des
      }
      callApiSua(data);
    })
  }

  const callApiSua = async (data: any) => {
    try {
      setLoading(true);
      const res = await QuanLyTaiKhoanApi.apiSua(data);
      if (res) {
        setLoading(false);
        message.success('Cập nhật thành công')
        const dataUserStorage = {
          id: dataUser.id,
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          groupNames: dataUser.groupNames,
          groupIds: dataUser.groupIds,
          des: data.des,
          nameUnitManagement: dataUser.nameUnitManagement,
          phone: data.phone,
          position: data.position,
          unitManagement: dataUser.unitManagement,
        }
        localStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(dataUserStorage));
        handleClose()
      }
    } catch { }
    finally { }
  }

  useEffect(() => {
    const group = dataUser.groupNames ? dataUser.groupNames.join(' | ') : null

    formCreate.setFieldsValue({
      username: dataUser.username || null,
      fullName: dataUser.fullName || null,
      email: dataUser.email || null,
      phone: dataUser.phone || null,
      des: dataUser.des || null,
      position: Number(dataUser?.position) || null,
      groups: group || null,
      nameUnitManagement: dataUser.nameUnitManagement || null,

    });
    // dataDetail && dataDetail.group && setGroup(dataDetail.group);
    // dataDetail && dataDetail.unitManagement && setUnitManagement(dataDetail.unitManagement);
  }, [dataUser])

  return (
    <Modal
      title='Thông tin cá nhân'
      width='500px'
      open={open}
      onCancel={handleClose}
      footer={[
        <div>
          <Button type='primary' htmlType='button' style={{ marginRight: "10px" }} onClick={() => onFinish(formCreate.getFieldsValue(), true)}>Lưu</Button>
          <Button key='cancel' onClick={handleClose} type='primary' danger={true}> Đóng </Button>
        </div>
      ]}
    >
      <Form layout='vertical' onFinish={(values) => onFinish(values, false)} form={formCreate} >
        <div className='flex flex-col gap-2 p-2' style={{ border: '1px solid var(--gt-border-color)', borderRadius: '0.5rem' }}>
          <div className='flex items-center justify-start' style={{ fontSize: '1rem', color: 'var(--primary-color)', fontWeight: '700' }}>Thông tin tài khoản</div>
          <Row gutter={[8, 8]}>
            <Col sm={24} className='px-2'>
              <Input
                label={"Tên tài khoản"}
                name='username'
                disabled={true}
              />
            </Col>
            <Col sm={24} className='px-2'>
              <Input
                label={"Họ tên"}
                name='fullName'
                required={true}
                placeholder={`Nhập họ tên`}
              />
            </Col>
            <Col sm={24} className='px-2'>
              <Input
                label={"Email"}
                name='email'
                placeholder={`Nhập email`}
                required={true}
                rules={[
                  { required: true, message: `$Email không được để trống` },
                  { max: 100, message: 'Không vượt quá 100 ký tự' },
                  { pattern: REGEXP_EMAIL, message: `$Email không đúng định dạng` }
                ]} />
            </Col>
            <Col sm={24} className='px-2'>
              <Input
                label={"Nhóm quyền"}
                name='groups'
                disabled={true}
              />
            </Col>
            <Col sm={24} className='px-2'>
              <Input
                label={"Đơn vị quản lý"}
                name='nameUnitManagement'
                disabled={true}
              />
            </Col>
            <Col sm={24} className='px-1'>
              <Select
                label={"Chức vụ"}
                placeholder={`Chọn chức vụ`}
                name='position'
                allowClear={true}
                showSearch={true}
                options={[]}
              />
            </Col>
            <Col sm={24} className='px-1'>
              <Input
                name='phone'
                label={"Số điện thoại"}
                placeholder={`Nhập số điện thoại`}
                maxLength={11}
                rules={[
                  { pattern: REGEXP_PHONE, message: 'Số điện thoại không hợp lệ' }
                ]}
              />
            </Col>
            <Col sm={24} className='px-1'>
              <Textarea
                name='des'
                label={"Mô tả"}
                placeholder={`Nhập mô tả`}
                style={{ height: 120, resize: 'none' }}
              />
            </Col>
          </Row>
        </div>
      </Form >
    </Modal >
  );
};

export default ModalThongTinCaNhan;
