import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/Header'; // Thành phần Header đã tạo
import AppFooter from '../components/Header'; // Thành phần Footer (sẽ tạo sau)
import './MainLayout.css'; // Tạo CSS cho layout

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="main-layout">
      <AppHeader />
      <Content className="main-content">
        {children}
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
