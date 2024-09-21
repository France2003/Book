import React, { useEffect, useState } from 'react';
import { Input, Button, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaArrowUp } from "react-icons/fa";
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
  const [showArrow, setShowArrow] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 200) {
  //       setShowArrow(true);
  //     } else {
  //       setShowArrow(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 10;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 35);
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
    <header className="bg-white shadow-md border-2 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className='flex flex-col items-center'>
          <img src="https://png.pngtree.com/png-vector/20240712/ourmid/pngtree-book-and-education-logo-vector-png-image_13061759.png" alt="Logo" height={80} width={80} />
          <span className="ml-2 text-3xl font-extrabold text-purple-600">
            {['H', 'U', 'Y', ' ', 'B', 'O', 'O', 'K', 'S'].map((letter, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  transform: `rotate(${index % 2 === 0 ? 10 : -10}deg)`,
                  color: `hsl(${index * 40}, 90%, 60%)`, // gives each letter a different color
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
      {showArrow && (
        <div onClick={scrollToTop} className="fixed z-10 bottom-5 right-5 bg-gray-700 p-2 rounded-full cursor-pointer">
          <FaArrowUp className="text-white text-2xl" />
        </div>
      )}
    </header>
  );
};

export default Header;
