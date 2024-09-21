import { Input, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

const Header = () => {
  const onSearch = (value:any) => {
    console.log(value);  // Xử lý tìm kiếm
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">BookStore</Link>
      </div>
      <div className="search-bar">
        <Search placeholder="Tìm kiếm sách..." onSearch={onSearch} enterButton />
      </div>
      <div className="cart">
        <Badge count={5}>
          <Link to="/cart">
            <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </Link>
        </Badge>
      </div>
    </header>
  );
};

export default Header;
