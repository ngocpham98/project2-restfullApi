import { Layout } from 'antd';
import React from 'react';
const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter style={{ background: '#fff', textAlign: 'center' }}>
      &copy; 2023 Ngoc Pham
    </AntdFooter>
  );
};

export default Footer;
