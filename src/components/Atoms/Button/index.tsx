import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import './index.less';

export interface Props extends ButtonProps { }

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>;
};
