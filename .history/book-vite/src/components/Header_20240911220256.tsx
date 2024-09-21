import React, { useEffect, useState } from 'react';
import { Input, Button, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      navigate("/book");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/order-confirmation">Đơn hàng của tôi</Link> {/* Chuyển đến trang đơn hàng */}
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className='flex flex-col items-center'>
          <img src="https://png.pngtree.com/png-vector/20240712/ourmid/pngtree-book-and-education-logo-vector-png-image_13061759.png" alt="Logo" height={80} width={80} />
          <span className="ml-2 text-xl font-bold">HUY BOOKS</span>
        </Link>
        <div className="flex-1 mx-4">
          <Search
            placeholder="Tìm kiếm sản phẩm"
            enterButton
            size="large"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <Badge count={cartItems.length} showZero>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} />
            </Badge>
          </Link>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Button icon={<UserOutlined />} type="text">
              Weocomle, {user.name} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
