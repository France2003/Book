import React, { useEffect, useState } from 'react';
import { Input, Button, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaArrowUp } from "react-icons/fa";
import HeaderCommitment from './HeaderCommitment';
const { Search } = Input;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const booksByGrade = useSelector((state: RootState) => state.books.booksByGrade); // Thêm vào để tìm kiếm sách
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed User:', parsedUser); 
        if (parsedUser && parsedUser.name) {
          setUser(parsedUser);
        } else {
          console.warn('User data is missing the name property.'); 
          navigate("/Book/login");
        }
      } catch (error) {
        console.error('Error parsing user data:', error); 
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
  
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <Link to="/Book/profile">Thông tin tài khoản</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/Book/order-confirmation">Đơn hàng của tôi</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const handleSearch = (value: string) => {
    // Điều hướng tới trang tìm kiếm sách
    navigate(`/Book/search?query=${value}`);
  };

  return (
    <header className="bg-white border-2 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/Book/" className='flex flex-col items-center'>
          <img src="https://png.pngtree.com/png-vector/20240712/ourmid/pngtree-book-and-education-logo-vector-png-image_13061759.png" alt="Logo" height={80} width={80} />
          <span className="ml-2 text-3xl font-extrabold text-purple-600">
            {['H', 'U', 'Y', ' ', 'B', 'O', 'O', 'K', 'S'].map((letter, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  color: index === 0 ? 'blue' : 'purple',
                  transition: 'color 0.5s',
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </Link>

        {/* Search bar moved here */}
        <div className="w-1/2 md:w-1/3">
          <Search
            placeholder="Tìm kiếm sách..."
            enterButton={<Button icon={<SearchOutlined />} />}
            size="large"
            onSearch={handleSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Cart and user profile */}
        <div className="flex items-center space-x-4">
          <Link to="/Book/cart">
            <Badge count={cartItems.length} offset={[0, 0]}>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} />
            </Badge>
          </Link>
          {user && (
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Button>
                <UserOutlined />
                {user.name} <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
      <HeaderCommitment />
      {showArrow && (
        <div onClick={scrollToTop} className="fixed bottom-4 right-4 cursor-pointer bg-gray-300 p-2 rounded-full">
          <FaArrowUp />
        </div>
      )}
    </header>
  );
};

export default Header;
