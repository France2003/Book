import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const AppFooter: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      ©2024 Your Bookstore. All Rights Reserved.
    </AntFooter>
  );
};

export default AppFooter;
