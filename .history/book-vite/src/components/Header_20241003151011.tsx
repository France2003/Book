import React, { useEffect, useState } from 'react';
import { Input, Button, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaHeart } from "react-icons/fa";
const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setUser(parsedUser);
        } else {
          navigate("/Book/login");
        }
      } catch (error) {
        navigate("/Book/login");
      }
    } else {
      navigate("/Book/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate("/Book/login");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/Book/Search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/Book/profile">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/Book/order-confirmation">Đơn hàng của tôi</Link>
      </Menu.Item>
      <Menu.Item>
        <Link className='flex items-center gap-2' to="/Book/favorites">Danh sách yêu thích</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white border-2 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/Book/" className='flex flex-col items-center'>
          <img src="https://png.pngtree.com/png-vector/20240712/ourmid/pngtree-book-and-education-logo-vector-png-image_13061759.png" alt="Logo" height={80} width={80} />
          <span className="ml-2 text-3xl font-extrabold text-purple-600">
            {['H', 'U', 'Y', ' ', 'S', 'G','K'].map((letter, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  transform: `rotate(${index % 2 === 0 ? 10 : -10}deg)`,
                  color: `hsl(${index * 40}, 90%, 60%)`,
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </Link>
        <div className="flex-1 mx-4">
          <Search
            placeholder="Tìm kiếm sản phẩm"
            enterButton
            size="large"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/Book/cart">
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
            <Link to="/Book/login">
              <Button icon={<UserOutlined />} type="text">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
