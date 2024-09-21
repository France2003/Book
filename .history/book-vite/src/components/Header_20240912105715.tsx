import React, { useEffect, useState } from 'react';
import { Input, Button, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CheckCircleOutlined, SyncOutlined, GiftOutlined, CarOutlined, DollarCircleOutlined, RocketOutlined } from '@ant-design/icons';

const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed User:', parsedUser); // Debugging line
        if (parsedUser && parsedUser.name) {
          setUser(parsedUser);
        } else {
          console.warn('User data is missing the name property.'); // Debugging line
          navigate("/login");
        }
      } catch (error) {
        console.error('Error parsing user data:', error); // Debugging line
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/order-confirmation">Đơn hàng của tôi</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        Đăng xuất
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
          {user ? (
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Button icon={<UserOutlined />} type="text">
                Welcome, {user.name} <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button icon={<UserOutlined />} type="text">Login</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-blue-500 font-semibold">Cam kết</h3>
        </div>
        <div className="flex justify-between space-x-6">
          <div className="flex items-center space-x-2">
            <CheckCircleOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>100% hàng thật</span>
          </div>
          <div className="flex items-center space-x-2">
            <SyncOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Hoàn 200% nếu hàng giả</span>
          </div>
          <div className="flex items-center space-x-2">
            <GiftOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>30 ngày đổi trả</span>
          </div>
          <div className="flex items-center space-x-2">
            <CarOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Giao nhanh 2h</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarCircleOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Giá siêu rẻ</span>
          </div>
          <div className="flex items-center space-x-2">
            <RocketOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Freeship mọi đơn</span>
          </div>
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;
