import React, { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout } from 'antd';
import { Helmet } from 'react-helmet';
import './styles.less';
import { useLocation } from '@/hooks';
import useAccountLogin from '@/hooks/useAccountLogin';
import { MenuItem } from '@/layout/SiderBar/types';

const { Header } = Layout;

const Breadcumbs: React.FC = () => {
  const defaultLabels = [''];
  const { pathname } = useLocation();
  const { currentMenu } = useAccountLogin();
  const [labels, setLabels] = useState<string[]>(defaultLabels);
  const lastestLabel = labels[labels.length - 1];
  const menu: MenuItem[] = [...currentMenu];

  function getActiveBreadCumbs(menu: MenuItem[], initialValue: string[] = []) {
    menu.forEach((item) => {
      item.key && item.key !== '/' && pathname.includes(item.key) && initialValue.push(item.label);
      item.children ? getActiveBreadCumbs(item.children, initialValue) : undefined;
    });
    return initialValue;
  }

  useEffect(() => {
    const activeLabelArr = getActiveBreadCumbs(menu);
    setLabels(activeLabelArr.length > 0 ? activeLabelArr : defaultLabels);
  }, [pathname, menu.length]);

  return (
    <div>
      <Header className='gt-layout-header'>
        <div className='heading'>
          <Helmet>
            <title>{lastestLabel}</title>
            <meta name='description' content={lastestLabel} />
          </Helmet>
          <Breadcrumb
            className='header-breadcumbs'
            separator={<CaretRightOutlined style={{ fontSize: '14px' }} />}
            items={labels.map((item) => ({ title: item, key: item }))}
          />
        </div>
      </Header>
    </div>
  );
};

export default Breadcumbs;
