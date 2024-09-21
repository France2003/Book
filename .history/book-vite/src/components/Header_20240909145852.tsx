import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import CartButton from './CartButton'; // Giả sử đã có CartButton


const { Header: AntHeader } = Layout;

const AppHeader: React.FC = () => {
  return (
    <AntHeader className="app-header">
      <div className="logo">
        <Link to="/"> {/* Đường dẫn logo về trang chủ */}
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/about">Giới thiệu</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/categories">Phân thể loại</Link>
        </Menu.Item>
        {/* Thêm các mục menu khác nếu cần */}
      </Menu>
      <div className="header-right">
        <CartButton /> {/* Nút giỏ hàng */}
        <Button type="primary" style={{ marginLeft: '10px' }}>
          <Link to="/login">Đăng nhập</Link>
        </Button>
        <Button type="default" style={{ marginLeft: '10px' }}>
          <Link to="/register">Đăng ký</Link>
        </Button>
      </div>
    </AntHeader>
  );
};

export default AppHeader;
