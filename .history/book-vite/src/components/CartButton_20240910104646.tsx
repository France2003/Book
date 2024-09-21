import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'antd';
import { RootState } from '../redux/store';

const CartButton: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Link to="/cart" className='mt-28'>
      <Badge count={cartItems.length} showZero>
        <Button type="primary" icon={<i className="fas fa-shopping-cart"></i>}>
          Giỏ hàng
        </Button>
      </Badge>
    </Link>
  );
};

export default CartButton;
